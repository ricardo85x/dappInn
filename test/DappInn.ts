import chai from "chai";
const { expect} = chai;

import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)

import { ethers, waffle } from "hardhat"
const { deployContract } = waffle;

import DappInnArtifact from "../src/artifacts/contracts/DappInn.sol/DappInn.json"
import { DappInn } from "../src/types/DappInn"

describe("DappInn", () => {

    let dappInn: DappInn;

    let roomValue = ethers.BigNumber.from(0);


    beforeEach(async () => {
        const signers = await ethers.getSigners()
        dappInn = (await deployContract(signers[0], DappInnArtifact)) as DappInn;

        roomValue = await dappInn.defaultRoomPriceInWei();

    })

    it("should check in", async () => {

        expect((await dappInn.rooms(0)).status).to.be.equal(0);

        await dappInn.checkIn(0,10, { value: roomValue.mul(10)  });

        expect((await dappInn.rooms(0)).status).to.be.equal(1);
    })

    it("should check out", async () => {

        expect((await dappInn.rooms(0)).status).to.be.equal(0);

        await dappInn.checkIn(0,10, { value: roomValue.mul(10) });

        expect((await dappInn.rooms(0)).status).to.be.equal(1);

        await dappInn.checkOut(0);

        expect((await dappInn.rooms(0)).status).to.be.equal(0);
    })

    it("should not let to checkOut somebody else room", async () => {

        await expect(
            dappInn.checkOut(44)
        ).to.eventually.be.rejectedWith(Error)
            .and.have.property('message').include("you are not in the room");

    })

    it("should let change the price", async () => {

        const _period = 22;
        let _newPrice = 200;
        const _roomNumber = 5;

        // TEST NEW ROOM PRICE
        await dappInn.setRoomPrice(_roomNumber,_newPrice);

        await expect(dappInn.checkIn(_roomNumber, _period, { 
            value: ethers.BigNumber.from(_period).mul(_newPrice) 
        })).to.eventually.exist.fulfilled;

        // SET A LOWER VALUE TO DEFAULT ROOM PRICE
        _newPrice = 100;

        await dappInn.setDefaultRoomPrice(_newPrice);

        // EXPECTED OTHER ROOM USE THIS LOWER VALUE
        await expect(dappInn.checkIn(0, _period, { 
            value: ethers.BigNumber.from(_period).mul(_newPrice) 
        })).to.eventually.exist.fulfilled;

        // EXPECTED A ERROR WHEN USING THIS LOWER VALUE ON a NON ZERO PRICE ROOM
        await expect(dappInn.checkIn(_roomNumber, _period, { 
            value: ethers.BigNumber.from(_period).mul(_newPrice) 
        })).to.eventually.exist.rejected;

        // RESET THE ROOM PRICE
        await dappInn.setRoomPrice(_roomNumber,0);

        // NOW IT SHOULD PASS
        await expect(dappInn.checkIn(_roomNumber, _period, { 
            value: ethers.BigNumber.from(_period).mul(_newPrice) 
        })).to.eventually.exist.fulfilled;

    })

    it("should allow withdraw", async () => {

        await dappInn.checkIn(0,10, { value: roomValue.mul(10) });

        await dappInn.checkIn(1,10, { value: roomValue.mul(10) });

        await dappInn.checkIn(1,10, { value: roomValue.mul(10) });

        let current_balance = await dappInn.balance();

        expect(current_balance.toNumber()).to.be.greaterThan(30)

        await expect(dappInn.withdrawAll()).to.eventually.exist.fulfilled;

        current_balance = await dappInn.balance();

        expect(current_balance.toNumber()).to.be.equals(0)

    })

    it("should manage services", async () => {

        await dappInn.checkIn(0,10, { value: roomValue.mul(10)  });

        await dappInn.addRoomService("Beer", 300);
        await dappInn.addRoomService("Cleaning Service", 500);

        await dappInn.buyRoomService(0,0, { value: 300});
        await dappInn.buyRoomService(0,1, { value: 500});

        const myTab = await dappInn.getRoomTab(0);

        console.log(myTab);

    })
})
