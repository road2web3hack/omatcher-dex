//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// methods picked for fungible token interface:
interface IERC20 {
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address _owner) external view returns (uint);
    function transferFrom(address sender, address recipient, uint256 amount) external;
}
import "hardhat/console.sol";

// This is a quick iteration for the generic pair of (2 )tokens to have queues of waiting orders at given price..:
contract MarketPair {
    IERC20 tokenA; IERC20 tokenB; // callable token contract addresses in fact
    // and let's have this nomenclature: *buy* action means putting in tokenB striving for tokenA;
    //                                   *sell* means putting tokenA away in exchange for some tokenB.
    uint fee;// in x/10000 units, ex. 100 means 1% fee to the deployer( now, DAO/treasury later)
    address deployer;// in future not stored on each pair but on the factory/router instead, which will have addr here.

    // Single sell or buy order type:
    struct Order { // seems hidden here, either put out, or make the pair inside a call bellow
        uint price;
        uint amount;
        /////v2 would add pre-paid callBack on filling.!.
    }
    mapping (uint => Order) private buyOrdersBook; // to be (a clever )linked-list soon
    mapping (uint => Order) private sellOrdersBook; // to be (a clever )linked-list soon

    constructor(address tokenAcontractAddress, address tokenBcontractAddress) {
        // some event on creation?
        tokenA = IERC20( tokenAcontractAddress); tokenB = IERC20( tokenBcontractAddress);
        // set fee to a constant rn, will become a parameter when we have pair factory..:
        fee = 10; // 0.1 % represented as 10/10'000
    }

    function getTopBuy() public view returns (Order memory) { // much dummy yet
        return buyOrdersBook[0];
    }

    // todo: 100% make this payable and grab the reserve ETH/matic/native sum for case of the order becomming unfullfillable.
    // dummy fn to buy some Link for lower price than lowest sell:
    // function addBuyOrder(Order memory o) public { // will likely get the lower field to put after or smt, I'll check bs notes
    function addBuyOrder(uint priceToBuyFor, uint amountToObtain) public { //t, I'll check bs notes
        // See if the funds to put for trade are readily available, now fail, later we can optimize 
        //  so that only in a set range around mid price there is such requirement
        require(checkAllowance(tokenB, amountToObtain), "sender has not enough tokenB to pay with");
        buyOrdersBook[0]=Order(priceToBuyFor, amountToObtain);// buyOrdersBook.add(o);//dumbness RN
        console.log("..");
    }

    function checkAllowance(
        IERC20 token, // address tokenAddr,
        uint256 amountToBeSold
    ) internal view returns( bool ) {
        console.log("msg.sender to checkAllowance:", msg.sender);
        // return IERC20(tokenAddr).allowance(msg.sender, address(this)) >= amountToBeSold;
        return token.allowance(msg.sender, address(this)) >= amountToBeSold;
    }
}
