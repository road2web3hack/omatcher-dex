// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const FirstContract = "MarketPair"

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  let d=0;
  let sc;
  if(d==0){
    // We get the contract to deploy
    const SC = await hre.ethers.getContractFactory(FirstContract);
    // sc = await SC.deploy("0x326c977e6efc84e512bb9c30f76e30c160ed06fb", "0x2d7882bedcbfddce29ba99965dd3cdf7fcb10a1e") //("Link", "TST") addrses on Mumbai
    sc = await SC.deploy("0x326c977e6efc84e512bb9c30f76e30c160ed06fb", "0x326c977e6efc84e512bb9c30f76e30c160ed06fb") //("Link", "Link") before we find better/reliable contracts
    await sc.deployed();
    console.log(FirstContract+" deployed to:", sc.address, "see https://mumbai.polygonscan.com/tx/"+sc.deployTransaction.hash);
  }else{
    sc = await hre.ethers.getContractAt(FirstContract, "0x2740450C1De47Afd08d430aB18B30ae8b69fa175");
  }
  // console.log(hre.etherscan.apiKey, "\n\n");//undefined, so it is very suspicious

  // Some proto-tests to put some data in:
  async function getERC20(address) {
    return await ethers.getContractAt(
      '@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20',
      address
    );
  }
  // Approve deployer's funds:
  // lnk = await hre.ethers.getContractAt(IERC20, "0x326c977e6efc84e512bb9c30f76e30c160ed06fb")
  lnk = await getERC20("0x326c977e6efc84e512bb9c30f76e30c160ed06fb")//on testnet
  await lnk.approve(sc.address, 10000000);

  tx = await sc.addBuyOrder(25, 5000); // Comes through, but shows weird error message on the tx page( below)
  console.log("added order as https://mumbai.polygonscan.com/tx/"+tx.hash); //tx);
  console.log("now the best buy order is "+await sc.getTopBuy());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
