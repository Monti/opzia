# Opzia
Opzia, a trustless pereptual option

## Contract Description
OptionOffer 
```solidity
// Right now this is a single big contract, probably split it to each token
// Need to think about maybe price restrictions to the option offerer

contract OptionRegistry{// An option registry for a TOKEN/ETH market
struct OptionOffer{
  uint duration; // Amount of time an option can last
  uint minDuration; //Amount of time before option can be taken
  uint32 volatility; // The maximal expected change in price within duration in ppm
  uint32 fee; // Percentage of distance between current price and volatility to take as fee in ppm
  uint32 percentage; //Percentage of assets this option can lock
  address[] approvedExchanges;
  address owner;
 
}

struct PriceLock{
  uint offerIndex;
  uint creation;
  uint rate; // Locked rate from the other asset to the asset locked 
  uint amount; // Amount of assets locked
  address taker;
  bool ethOrToken; // whether the lock was on eth or the token
}

ERC20 token;
mapping(address=>uint) userTotalBalances
mapping(address=>uint) userBalances; //holds the available user balances
PriceLock[] priceLocks; 
OptionOffer[] offers;
mapping(address => uint[]) userToOffers;
mapping(address => uint[]) userToLocks;

// Locks amountToLock ether at current rate (for duration) and attempts to pull amountToLock*etherRate*volatility*fee
function lockEtherAtPrice(ExchangeInterface exchange, uint amountToLock, uint offerIndex) public; 

/ Locks amountToLock token at current rate (for duration) and validates msg.valud has amountToLock*tokenRate*volatility*fee
function lockTokenAtPrice(ExchangeInterface exchange, uint amountToLock, uint offerIndex) public; 

// Creates an offer, attempting to pull tokenAmount and msg.value for UX
function addOffer(...offerParams, uint tokenAmount) payable;

// Sends locked amount to user and takes the assets according ot the original locked rate111
function takeLock(uint lockIndex) payable;
}
```

## Price Estimations
Atm I think it's going to be somewhere around 400k to open an offer
Probs 200k to lock the price and around 70k to acutalize it but that's fingermath
