import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';


import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';

import ethernal from "hardhat-ethernal";

import { DappInn as DappInnProps } from "../src/types/DappInn"


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const dappInn = await deploy('DappInn', {
    from: deployer,
    args: [],
    log: true,
  });

  const dappInnContract = await ethers.getContractAt("DappInn", dappInn.address) as DappInnProps;

  await hre.ethernal.push({
    name: 'DappInn',
    address: dappInn.address
  });


  // custo default price

  await dappInnContract.setDefaultRoomPrice(
    BigNumber.from(
      ethers.utils.parseEther("0.051")
    ).div(60 * 60 * 24)
  ) // 0.05 ETH per day

  // add custom price in some rooms ( price in wei in seconds!)
  await dappInnContract.setRoomPrice(3,
    BigNumber.from(
      ethers.utils.parseEther("0.061")
    ).div(60 * 60 * 24)
  ) // 0.06 ETH per day

  await dappInnContract.setRoomPrice(7,
    BigNumber.from(
      ethers.utils.parseEther("0.071")
    ).div(60 * 60 * 24)
  ) // 0.07 ETH per day

  await dappInnContract.setRoomPrice(9,
    BigNumber.from(
      ethers.utils.parseEther("0.11")
    ).div(60 * 60 * 24)
  ) // 0.1 ETH per day

  // add some services
  await dappInnContract.addRoomService("Cleaning Service",
    BigNumber.from(
      ethers.utils.parseEther("0.011")
    )
  );
  await dappInnContract.addRoomService("Bottle of Water",
    BigNumber.from(
      ethers.utils.parseEther("0.0021")
    )
  );
  await dappInnContract.addRoomService("Bottle of Wine",
    BigNumber.from(
      ethers.utils.parseEther("0.041")
    )
  );
  await dappInnContract.addRoomService("Shower Soap",
    BigNumber.from(
      ethers.utils.parseEther("0.00051")
    )
  );
  await dappInnContract.addRoomService("Red Label",
    BigNumber.from(
      ethers.utils.parseEther("0.0751")
    )
  );
  await dappInnContract.addRoomService("Duff Beer",
    BigNumber.from(
      ethers.utils.parseEther("0.0051")
    )
  );

  await dappInnContract.addRoomService("Chocolate bar",
    BigNumber.from(
      ethers.utils.parseEther("0.0021")
    )
  );


};
export default func;
func.tags = ['DappInn'];