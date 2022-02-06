// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const TokenContract = "TVMToken"

async function main() {
  // We get the contract to deploy
  const SC = await hre.ethers.getContractFactory(TokenContract);
  sc = await SC.deploy();
  await sc.deployed();
  console.log(TokenContract+" deployed to:", sc.address, "see https://mumbai.polygonscan.com/tx/"+sc.deployTransaction.hash);

  // Sprinkle some funds elswhere for a quick test:
  await sc.transfer("0x26118ED44b30d45246c626440477149a9c665574", 10000000); // to Oak's wallet
  console.log("put some to our guy in https://mumbai.polygonscan.com/tx/"+tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
