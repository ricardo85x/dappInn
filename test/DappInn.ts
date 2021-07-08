import chai from "chai";
const { expect} = chai;

import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)

import { ethers, waffle } from "hardhat"
const { deployContract } = waffle;

import DappInnArtifact from "../artifacts/contracts/DappInn.sol/DappInn.json"
import { DappInn } from "../src/types/DappInn"

describe("DappInn", () => {

    let dappInn: DappInn;

    let roomValue = ethers.BigNumber.from(0);


    beforeEach(async () => {
        const signers = await ethers.getSigners()
        dappInn = (await deployContract(signers[0], DappInnArtifact)) as DappInn;

        roomValue = await dappInn.roomPriceInWei();

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

        await dappInn.setRoomPrice(2);

        await expect(dappInn.checkIn(5, 22, { 
            value: ethers.BigNumber.from(2).mul(22) 
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
})
