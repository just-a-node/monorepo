import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "./tasks/cmd/deploy-bridge";
import "./tasks/cmd/deploy-faucet";
import "./tasks/cmd/deploy-implementation";
import "./tasks/cmd/register";
import "./tasks/integration/register";
import "./tasks/integration/deploy";
import "./tasks/experimental/deploy-x-nft-trader";
import "./tasks/experimental/create-order";
import "./tasks/experimental/x-fill-order";

import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

import networks from "./networks.json";

dotenv.config();

const accounts = process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.11",
  networks: {
    hardhat: process.env.FORK_RINKEBY
      ? {
          forking: {
            url: networks.rinkeby.rpc,
            blockNumber: 10857376,
          },
        }
      : {},
    rinkeby: {
      url: networks.rinkeby.rpc,
      accounts,
    },
    goerli: {
      url: networks.goerli.rpc,
      accounts,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
