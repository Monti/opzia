# Opzia
Opzia, a trustless pereptual option

## Contract Description
OptionOffer 
```solidity
// Right now this is a single big contract, probably split it to each token
// Need to think about maybe price restrictions to the option offerer

contract OptionOffers{ // A token to eth price lock offer
struct OptionOffer{
  uint duration; // Amount of time an option can last
  uint32 volatility; // The maximal expected change in price within duration in ppm
  uint32 fee; // Percentage of distance between current price and volatility to take as fee in ppm
  address token; // token locked
  address[] approvedExchanges;
  address owner;
  mapping(address => uint) approvedAmount; //ppm of total assets approved for this option
}

struct PriceLock{
  uint offerIndex;
  uint creation;
  address taker;
  bool ethOrToken;
  uint rate;
  uint amount; 
}

mapping(address=>address=>uint) userTotalBalances
mapping(address=>address=>uint) userBalances; //holds the user balances
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
