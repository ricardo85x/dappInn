import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';


import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';

import ethernal from "hardhat-ethernal";

import { DappInn as DappInnProps } from  "../src/types/DappInn"


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const { deployer } = await getNamedAccounts();

  const dappInn = await deploy('DappInn', {
    from: deployer,
    args: [],
    log: true,
  });

  const dappInnContract = await ethers.getContractAt("DappInn",dappInn.address) as DappInnProps;

  await hre.ethernal.push({
    name: 'DappInn',
    address: dappInn.address
  });


  // custo default price

  await dappInnContract.setDefaultRoomPrice(10**10)

  // add custom price in some rooms ( price in wei in seconds!)
  await dappInnContract.setRoomPrice(3,10**11);
  await dappInnContract.setRoomPrice(7,10**12);
  await dappInnContract.setRoomPrice(9,10**13);

  // add some services
  await dappInnContract.addRoomService("Cleaning Service", 80**5);
  await dappInnContract.addRoomService("Bottle of Water", 10**5);
  await dappInnContract.addRoomService("Bottle of Wine", 50**5);
  await dappInnContract.addRoomService("Shower Soap", 5**5);
  await dappInnContract.addRoomService("Red Label", 100**5);
  await dappInnContract.addRoomService("Duff Beer", 8**5);
  await dappInnContract.addRoomService("Chocolate bar", 8**5);

};
export default func;
func.tags = ['DappInn' ];