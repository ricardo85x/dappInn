import { HardhatUserConfig } from "hardhat/types";
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
  },
};

export default config;