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

  const optionFactory = await OptionRegistryFactory.deployed();

  const mockToken = await MockToken.deployed();

  return web3.eth
    .getAccounts()
    .then(async accounts => {
      let registry = await OptionRegistry.at(await optionFactory.tokenToRegistry.call(mockToken.address));
      const tokensSold = web3.utils.toWei("100");
      await mockToken.approve(registry.address, tokensSold);
      await registry.takeLock(0, tokensSold);
      console.log("Option taken")
      callback();
    })
    .catch(err => {
      callback(err);
    });
};
