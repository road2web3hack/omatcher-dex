//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// methods picked for fungible token interface:
interface IERC20 {
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address _owner) external view returns (uint);
    function transferFrom(address sender, address recipient, uint256 amount) external;
}
// import "hardhat/console.sol"; I do not support Hardhard (Brownie path)

// This is a quick iteration for the generic pair of (2 )tokens to have queues of waiting orders at given price..:
contract MarketPair {
    IERC20 TVM; // callable token contract addresses in fact
    // and let's have this nomenclature: *buy* action means putting in TVM striving for WETH;
    //                                   *sell* means putting WETH away in exchange for some TVM.
    uint fee;// in x/10000 units, ex. 100 means 1% fee to the deployer( now, DAO/treasury later)
    address deployer;// in future not stored on each pair but on the factory/router instead, which will have addr here.

    // Single sell or buy order type:
    struct Order { // seems hidden here, either put out, or make the pair inside a call bellow
        uint price;
        uint amount;
        /////v2 would add pre-paid callBack on filling.!.
    }
    // Those should each be a linked-list for scalable usage, simplistic structure now:
    Order[] public buyOrdersBook;
    Order[] public sellOrdersBook;

    constructor(address tokenAcontractAddress, address TVMcontractAddress) {
        // some event on creation?
        TVM = IERC20( TVMcontractAddress);
        // set fee to a constant rn, will become a parameter when we have pair factory..:
        fee = 10; // 0.1 % represented as 10/10'000
        deployer = msg.sender; //first phase that is the one to be allowed to claim any fees
    }

    function getTopBuy() public view returns (Order memory) { // much dummy yet
        if( buyOrdersBook.length > 0 ){
            return buyOrdersBook[0]; // index 0 as the one with best price( for a potencial seller)
        }else{
            return Order(0,0);
        }
    }

    // todo: 100% make this payable and grab the reserve ETH/matic/native sum for case of the order becomming unfullfillable.
    // dummy fn to buy some Link for lower price than lowest sell:
    // function addBuyOrder(Order memory o) public { // will likely get the lower field to put after or smt, I'll check bs notes
    function addBuyOrder(uint priceToBuyFor, uint amountToObtain) public { //t, I'll check bs notes
        // See if the funds to put for trade are readily available, now fail, later we can optimize 
        //  so that only in a set range around mid price there is such requirement
        uint amountToBeSold = priceToBuyFor * amountToObtain; // @todo work-out what to used for price instead of uint
        require( TVM.allowance(msg.sender, address(this)) >= amountToBeSold, "sender has not enough TVM to pay with" );
        buyOrdersBook.push( Order(priceToBuyFor, amountToObtain) );
    }

    function checkAllowance(
        IERC20 token, // address tokenAddr,
        uint256 amountToBeSold
    ) internal view returns( bool ) {
        // console.log("msg.sender to checkAllowance:", msg.sender);
        return token.allowance(msg.sender, address(this)) >= amountToBeSold;
    }
}
