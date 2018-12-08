# Opzia
Opzia, a trustless pereptual option

## Motivation

In the most general sense, an option is the right to purchase and asset at a certain predetermined price.
Additional conditions often apply, such as expiry after which option is no longer valid or minmal wait time before an option can be called after purchase.

The underlying process in option writing/buying is heaving two sides bet head to head. One is expecting low volatility and the other expecting high one.

In our side, the passive option writer picks a few parameters such as volatility, fee and duration and puts assets in the opzia smart contract. This constitutes an option offer.

A buyer can then pay a fee to purchase the option and lock the assets in the smart contract. The buyer can then call his purchased option and pay the locked price and exchange the assets with the contract.

Expired options get automatically removed by fishermen/watchers.


## Contract Description
Following is an outline of some of the key functions of the contract

```solidity
contract OptionRegistry{// An option registry for a TOKEN/ETH market
    using SafeMath for uint;
    using SafeMath for uint32;

    struct OptionOffer{
        uint32 volatility; // The maximal expected change in price within duration in ppm
        uint32 fee; // Percentage of distance between current price and volatility to take as fee in ppm
        uint maxAssetsLocked; //Max amount of assets this option can lock
        uint assetsLocked;
        bool ethOrToken;
        uint duration; // Amount of time an option can last
        uint minDuration; //Amount of time before option can be taken
        IExchange exchange;
        address owner;
    
    }

    struct PriceLock{
        uint offerIndex;
        uint creation;
        uint tokenAmount; // Locked rate from the other asset to the asset locked 
        uint ethAmount; // Amount of assets locked
        address taker;
        bool ethOrToken; // whether the lock was on eth or the token
    }

    IERC20 token;
    mapping(address=>uint) public userEthBalances; //holds the available user balances
    mapping(address=>uint) public userTokenBalances; //holds the available user balances
    PriceLock[] public priceLocks; 
    OptionOffer[] public offers;
    mapping(address => uint[]) public userToOffers;
    mapping(address => uint[]) public userToLocks;

    constructor(address _token) public{
        token = IERC20(_token);
    }

    /**
    @notice Creates an option offer, attempting to pull tokenAmount and msg.value for UX
    @param uint32Params An array of all the unit32 params according to:
    0 - volatility
    1 - fee
    
    @param uintParams An array of all the unit params according to:
    0 - duration
    1 - minDuration
    2 - maxAssetsLocked
    3 - tokenAmount - if there are any tokens to add to the position
    @param exchange An IExchange conmpatible on chain exchange
     */ 
    function addOffer(uint32[2] memory uint32Params, uint[4] memory uintParams, bool eth, IExchange exchange) public payable;

    /**
    @notice Locks amountToLock ether at current rate (for duration) and attempts to pull amountToLock*etherRate*volatility*fee
    @param amountToLock amount of ether to lock
    @param offerIndex index of offer facilitating the lock
     */

    function lockEthAtPrice(uint amountToLock, uint offerIndex) public;
    /**
    @notice Locks amountToLock token at current rate (for duration) and attempts to pull amountToLock*tokenRate*volatility*fee
    @param amountToLock amount of token to lock
    @param offerIndex index of offer facilitating the lock
     */

    function lockTokenAtPrice(uint amountToLock, uint offerIndex) public payable;

    

    /**
    @notice  Sends locked amount to user and takes the assets according ot the original locked rate
    @param lockIndex index of price lock
    */
    function takeLock(uint lockIndex, uint givenTokens) public payable;
    // Canceles an invalid lock
    function cancelLock(uint lockIndex) public;

    function addToken(uint amount) public;

    function addEther() public payable;

    function transfer(uint lockIndex, address recipient) public;

    function withdrawToken(uint amount) public;

    function withdrawEth(uint amount) public payable;

}
```

## Price Estimations
Atm I think it's going to be somewhere around 400k to open an offer
Probs 200k to lock the price and around 70k to acutalize it but that's fingermath
