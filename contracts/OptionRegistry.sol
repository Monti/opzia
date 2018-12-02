pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Exchange/IExchange.sol";

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
    function addOffer(uint32[2] memory uint32Params, uint[4] memory uintParams, bool eth, IExchange exchange) public payable{
        OptionOffer memory newOffer;
        newOffer.volatility = uint32Params[0];
        newOffer.fee = uint32Params[1];
        newOffer.maxAssetsLocked = uintParams[2];
        newOffer.duration = uintParams[0];
        newOffer.minDuration = uintParams[1];
        newOffer.exchange = exchange;
        newOffer.owner = msg.sender;
        newOffer.assetsLocked = 0;
        newOffer.ethOrToken = eth;

        userToOffers[msg.sender].push(offers.push(newOffer)-1);


        if (eth && msg.value > 0){
            userEthBalances[msg.sender] += msg.value;
        }

        if (!eth && uintParams[3] > 0){
            userTokenBalances[msg.sender] += uintParams[3];
            token.transferFrom(msg.sender, this, uintParams[3]);
        }

    }

    /**
    @notice Locks amountToLock ether at current rate (for duration) and attempts to pull amountToLock*etherRate*volatility*fee
    @param amountToLock amount of ether to lock
    @param offerIndex index of offer facilitating the lock
     */

    function lockEtherAtPrice(uint amountToLock, uint offerIndex) public{
        OptionOffer storage offer = offers[offerIndex];
        require(amountToLock > userEthBalances[offer.owner], "Not enough ETH");
        require(offer.ethOrToken, "Not an ETH offer");
        require(offer.maxAssetsLocked > amountToLock.add(offer.assetsLocked), "Too much to lock");
        uint tokensUsed = offer.exchange.getTokenToEthOutput(token, amountToLock);
        uint feeToTake = tokensUsed.mul(offer.volatility).mul(offer.fee);

        PriceLock memory newLock;
        newLock.offerIndex = offerIndex;
        newLock.creation = now;
        newLock.tokenAmount = tokensUsed;
        newLock.ethAmount = amountToLock;
        newLock.taker = msg.sender;
        newLock.ethOrToken = true;

        userToLocks[msg.sender].push(priceLocks.push(newLock)-1);
        userEthBalances[offer.owner] -= amountToLock;
        offer.assetsLocked += amountToLock;

        userTokenBalances[msg.sender] += feeToTake;

        token.transferFrom(msg.sender, this, feeToTake);
    }

    /**
    @notice Locks amountToLock token at current rate (for duration) and attempts to pull amountToLock*tokenRate*volatility*fee
    @param amountToLock amount of token to lock
    @param offerIndex index of offer facilitating the lock
     */

    function lockTokenAtPrice(uint amountToLock, uint offerIndex) public payable{
        OptionOffer storage offer = offers[offerIndex];
        require(amountToLock > userTokenBalances[offer.owner], "Not enough Token");
        require(!offer.ethOrToken, "Not a token offer");
        require(offer.maxAssetsLocked > amountToLock.add(offer.assetsLocked), "Too much to lock");
        uint ethUsed = offer.exchange.getEthToTokenOutput(token, amountToLock);
        uint feeToTake = ethUsed.mul(offer.volatility).mul(offer.fee);

        PriceLock memory newLock;
        newLock.offerIndex = offerIndex;
        newLock.creation = now;
        newLock.tokenAmount = amountToLock;
        newLock.ethAmount = ethUsed;
        newLock.taker = msg.sender;
        newLock.ethOrToken = false;

        userToLocks[msg.sender].push(priceLocks.push(newLock)-1);
        userTokenBalances[offer.owner] -= amountToLock;
        offer.assetsLocked += amountToLock;

        require(msg.value>feeToTake, "not enough fees");

        userEthBalances[msg.sender] += msg.value;

    }

    

    /**
    @notice  Sends locked amount to user and takes the assets according ot the original locked rate
    @param lockIndex index of price lock
    */
    function takeLock(uint lockIndex, uint givenTokens) public payable{
        PriceLock storage lock = priceLocks[lockIndex];
        OptionOffer storage offer = offers[lock.offerIndex];
        require(lock.taker == msg.sender, "Permission denied");
        require(lock.creation + offer.minDuration < now, "too early to take");
        require(lock.creation + offer.duration > now, "too late to take");

        if(offer.ethOrToken){
            require(givenTokens <= lock.tokenAmount, "Not enough locked");
            uint ethToSend = givenTokens.mul(lock.ethAmount).div(lock.tokenAmount);
            
            lock.tokenAmount -= givenTokens;
            lock.ethAmount -= ethToSend;
            
            offer.assetsLocked -= ethToSend;

            userTokenBalances[msg.sender] += givenTokens;

            msg.sender.transfer(ethToSend);
            token.transferFrom(msg.sender, this, givenTokens);
        }
        else{
            require(msg.value <= lock.ethAmount, "Not enough locked");
            uint tokensToSend = msg.value.mul(lock.tokenAmount).div(lock.ethAmount);
            
            lock.tokenAmount -= tokensToSend;
            lock.ethAmount -= msg.value;

            offer.assetsLocked -= tokensToSend;

            userEthBalances[msg.sender] += givenTokens;

            token.transfer(msg.sender, tokensToSend);

            
        }

    }

    // Canceles an invalid lock
    function cancelLock(uint lockIndex) public{
        uint startingGas = gasleft();
        PriceLock storage lock = priceLocks[lockIndex];
        OptionOffer storage offer = offers[lock.offerIndex];
        bool expired = lock.creation + offer.duration < now;
        bool notEmpty = lock.ethAmount > 0;
        require(expired && notEmpty, "Not valid for cancelation");
        if(lock.ethOrToken){
            lock.tokenAmount = 0;
            userEthBalances[offer.owner] += lock.ethAmount;
            offer.assetsLocked -= lock.ethAmount;
            lock.ethAmount = 0;
        }
        else{
            lock.ethAmount = 0;
            userTokenBalances[offer.owner] += lock.tokenAmount;
            offer.assetsLocked -= lock.tokenAmount;
            lock.tokenAmount = 0;
        }

        // Adding 60k for 2 writes + stipend + min tx
        uint ethToRefund = (startingGas - gasleft() + 60000)*tx.gasprice *3 /2;
        require(ethToRefund > userEthBalances[offer.owner], "User can't pay for consolidation");

        userEthBalances[offer.owner] -= ethToRefund;

        msg.sender.transfer(ethToRefund);
    
    }

    function addToken(uint amount) public{
        userTokenBalances[msg.sender] += amount;
        token.transferFrom(msg.sender, this, amount);
    }

    function addEther() public payable {
        userEthBalances[msg.sender] += msg.value; 
    }

    function changeOfferMaxAsset(uint offerIndex, uint32 newMaxAsset) public{
        OptionOffer storage offer = offers[offerIndex];
        require(msg.sender == offer.owner, "Permission denied");
        offer.maxAssetsLocked = newMaxAsset;
    }

    function transfer(uint lockIndex, address recipient) public {
        PriceLock storage lock = priceLocks[lockIndex];
        require(lock.taker == msg.sender, "Permission denied");
        lock.taker = recipient;
    }

    function withdrawToken(uint amount) public{
        require(amount<=userTokenBalances[msg.sender], "Not enough available assets");
        userTokenBalances[msg.sender] -= amount;

        token.transfer(msg.sender, amount);
    }

    function withdrawEth(uint amount) public payable{
        require(amount<=userEthBalances[msg.sender], "Not enough available assets");
        userEthBalances[msg.sender] -= msg.value; 
        msg.sender.transfer(amount);
    }

    function getOffersLength() public view returns(uint){
        return offers.length;
    }

    function getLocksLength() public view returns(uint){
        return priceLocks.length;
    }

    function getUserOffersLength(address user) public view returns(uint){
        return userToOffers[user].length;
    }

    function getUserLocksLength(address user) public view returns(uint){
        return userToLocks[user].length;
    }

}