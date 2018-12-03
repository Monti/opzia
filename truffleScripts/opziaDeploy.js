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
      let template = await factory.exchangeTemplate.call();
      if (template == NULL_ADDRESS) {
        await factory.initializeFactory(exchangeTemplate.address);
        console.log("Initialized factory");
        console.log("TEMPLATE:", await factory.exchangeTemplate.call());
      } else {
        console.log("Fetched existing factory");
      }
      let tokenExchange = null;
      let tokenExchangeAddress = await factory.getExchange(mockToken.address);
      if (tokenExchangeAddress == NULL_ADDRESS) {
        await factory.createExchange(mockToken.address);
        console.log("Created new exchange");
        tokenExchange = await UniswapExchange.at(
          await factory.getExchange(mockToken.address)
        );
        console.log("ADDRESS:", tokenExchange.address);
      } else {
        tokenExchange = await UniswapExchange.at(tokenExchangeAddress);
        console.log("Fetched existing exchange");
        console.log("ADDRESS:", tokenExchange.address);
      }
      let exchangeSupply = await tokenExchange.totalSupply.call();
      if (exchangeSupply.toString() != 10 * 10 ** 18) {
        const time = Math.floor(Date.now() / 1000) + 200;
        let num = new BN(1e21);
        console.log(num.toString());
        await mockToken.approve(
          tokenExchange.address,
          web3.utils.toWei("1000"),
          {
            from: accounts[0]
          }
        );
        console.log("Approved token sepnd");
        await tokenExchange.addLiquidity(1, web3.utils.toWei("1000"), time, {
          from: accounts[0],
          value: web3.utils.toWei("10")
        });
        console.log("Created new liquidity tokens");
        console.log(
          "SUPPLY:",
          (await tokenExchange.totalSupply.call()).toString()
        );
      } else {
        console.log("Liquidity seeded");
      }

      let mockTokenRegistry = null;
      let registryAddress = await optionFactory.tokenToRegistry.call(
        mockToken.address
      );
      if (registryAddress == NULL_ADDRESS) {
        await optionFactory.addFactory(mockToken.address);
        registryAddress = await optionFactory.tokenToRegistry.call(mockToken.address);
        mockTokenRegistry = await OptionRegistry.at(registryAddress);
        console.log("Created new registry");
        console.log("ADDRESS:", mockTokenRegistry.address);
      } else {
        mockTokenRegistry = await OptionRegistry.at(registryAddress);
        console.log("Fetched existing registry");
        console.log("ADDRESS:", mockTokenRegistry.address);
      }

      // Create ether option offer
      if (
        (await mockTokenRegistry.getUserOffersLength.call(accounts[0])) == 0
      ) {
        console.log("creating new option");
        const volatility = 10 * 1000;
        const fee = 10 * 1000;
        const duration = 60 * 60 * 24 * 3;
        const minDuration = duration / 3;
        const maxAssets = web3.utils.toWei("3");

        await mockTokenRegistry.addOffer(
          [volatility, fee],
          [duration, minDuration, maxAssets, 0],
          true,
          tokenExchange.address,
          { from: accounts[0], value: web3.utils.toWei("5") }
        );
        
        let offer = await mockTokenRegistry.offers.call(0);
        console.log(offer);

      }
      else{
        console.log("already have first offer")
        let offer = await mockTokenRegistry.offers.call(0);
        console.log(offer);
      }
      callback();
    })
    .catch(err => {
      callback(err);
    });
};
