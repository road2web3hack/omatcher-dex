require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require('hardhat-dependency-compiler');//!
require("hardhat-gas-reporter");
require("solidity-coverage");

// // having key in file system is not optimal but as the file is under .gitignore seems ok.
// // Using throw-away key with only faucet amounts only is adviced.
// const fs = require('fs');
// const maticPrivateKey = fs.readFileSync('../.maticPrivKey').toString().trim(); // should be inside try or something but what the hack

// We need to export an object to set up your config..:
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_URL || "https://rpc-mumbai.matic.today",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      gas: 9100000,
      gasPrice: 3000000000
    },
    polygon: {
      url: process.env.POLYGON_URL || "https://polygon-rpc.com",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    // apiKey: {
    //     // polygon settings, see https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html#multiple-api-keys-and-alternative-block-explorers
    //     // Created a key in https://polygonscan.com/myapikey , but still struggling to get `hh verify ` run correctly, problem just like https://ethereum.stackexchange.com/questions/120358/typeerror-etherscan-apikey-trim-is-not-a-function-how-add-multiple-api-keys
    //     polygon: process.env.POLYGONSCAN_API_KEY,
    //     polygonMumbai: process.env.POLYGONSCAN_API_KEY
    // }
  },
  dependencyCompiler: {
    // Enables to call .symbol() and .decimals() in scripts.
    paths: ['@openzeppelin/contracts/token/ERC20/ERC20.sol'],
  },
};
