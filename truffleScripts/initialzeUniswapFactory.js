const OptionRegistryFactory = artifacts.require("./OptionRegistryFactory.sol");
const OptionRegistry = artifacts.require("./OptionRegistry.sol");
const UniswapFactory = artifacts.require("uniswap_factory");
const UniswapExchange = artifacts.require("uniswap_exchange");
const MockToken = artifacts.require("./MockToken.sol");
const NO_WHERE = "0x000000000000000000000000000000000000dEaD";
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

var BN = require("bignumber.js");

module.exports = async function(callback) {
  console.log("STARTING");
  const exchangeTemplate = await UniswapExchange.deployed();
  const factory = await UniswapFactory.deployed();

  return web3.eth
    .getAccounts()
    .then(async accounts => {
      let template = await factory.exchangeTemplate.call();
      if (template == NULL_ADDRESS) {
        await factory.initializeFactory(exchangeTemplate.address);
        console.log("Initialized factory");
        console.log("TEMPLATE:", await factory.exchangeTemplate.call());
      } else {
        console.log("Fetched existing factory");
      }
      callback();
    })
    .catch(err => callback(err));
};
