// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const FirstContract = "MarketPair"

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  let d=1;
  let sc;
  if(d!=1){
    // We get the contract to deploy
    const SC = await hre.ethers.getContractFactory(FirstContract);
    sc = await SC.deploy("0x326c977e6efc84e512bb9c30f76e30c160ed06fb", "0x2d7882bedcbfddce29ba99965dd3cdf7fcb10a1e") //("Link", "TST") addrses on Mumbai
    await sc.deployed();
    console.log(FirstContract+" deployed to:", sc.address, "see https://mumbai.polygonscan.com/tx/"+sc.deployTransaction.hash);
  }else{
    sc = await hre.ethers.getContractAt(FirstContract, "0x5eB7f44573D04e7F0184Cf1a0B6cf906638c3163");
  }
  // console.log(hre.etherscan.apiKey, "\n\n");//undefined, so it is very suspicious
  // console.log(sc);

  // Some proto-tests to put some data in:
  tx = await sc.addBuyOrder(20, 5000); // Comes through, but shows weird error message on the tx page( below)
  console.log("added order as https://mumbai.polygonscan.com/tx/"+tx.hash); //tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
