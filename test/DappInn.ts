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

    beforeEach(async () => {
        const signers = await ethers.getSigners()
        dappInn = (await deployContract(signers[0], DappInnArtifact)) as DappInn;
    })

    it("should check in", async () => {

        expect((await dappInn.rooms(0)).status).to.be.equal(0);

        await dappInn.checkIn(0,10);

        expect((await dappInn.rooms(0)).status).to.be.equal(1);
    })

    it("should check out", async () => {

        expect((await dappInn.rooms(0)).status).to.be.equal(0);

        await dappInn.checkIn(0,10);

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


})