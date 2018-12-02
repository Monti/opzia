const OptionRegistryFactory = artifacts.require("./OptionRegistryFactory.sol");
const UniswapFactory = artifacts.require("uniswap_factory");
const UniswapExchange = artifacts.require("uniswap_exchange");
module.exports = function(deployer) {
  deployer.deploy(OptionRegistryFactory);
  deployer.deploy(UniswapExchange);
  deployer.deploy(UniswapFactory);
};
