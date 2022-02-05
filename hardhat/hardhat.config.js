require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// having key in file system is not optimal but as the file is under .gitignore seems ok.
// Using throw-away key with only faucet amounts only is adviced.
const fs = require('fs');
const maticPrivateKey = fs.readFileSync('../.maticPrivKey').toString().trim(); // should be inside try or something but what the hack

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
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [maticPrivateKey],
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
  // etherscan: "https://api-testnet.polygonscan.com/", // look into for `hh verify ..`=@todo
  etherscan: {
    apiKey: {
        // polygon settings, see https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html#multiple-api-keys-and-alternative-block-explorers
        // Created a key in https://polygonscan.com/myapikey , but still struggling to get `hh verify ` run correctly
        polygon: process.env.POLYGONSCAN_API_KEY,
        polygonMumbai: process.env.POLYGONSCAN_API_KEY
    }
  }
};
