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
        registryAddress = await optionFactory.tokenToRegistry.call(
          mockToken.address
        );
        mockTokenRegistry = await OptionRegistry.at(registryAddress);
        console.log("Created new registry");
        console.log("ADDRESS:", mockTokenRegistry.address);
      } else {
        mockTokenRegistry = await OptionRegistry.at(registryAddress);
        console.log("Fetched existing registry");
        console.log("ADDRESS:", mockTokenRegistry.address);
      }

      // Create ether option offer
      let offer = null;
      if (
        (await mockTokenRegistry.getUserOffersLength.call(accounts[0])) == 0
      ) {
        console.log("creating new ether option");
        const volatility = 10 * 1000;
        const fee = 10 * 1000;
        const duration = 60 * 60 * 24 * 3;
        const minDuration = 1;
        const maxAssets = web3.utils.toWei("3");

        await mockTokenRegistry.addOffer(
          [volatility, fee],
          [duration, minDuration, maxAssets, 0],
          true,
          tokenExchange.address,
          { from: accounts[0], value: web3.utils.toWei("5") }
        );

        offer = await mockTokenRegistry.offers.call(0);
        console.log(offer);
      } else {
        console.log("already have first offer");
        offer = await mockTokenRegistry.offers.call(0);
        console.log(offer);
      }

      // Create ether price lock
      if ((await mockTokenRegistry.getUserLocksLength.call(accounts[0])) == 0) {
        console.log("creating new lock");
        const amountToLock = web3.utils.toWei("1");
        const feeToApprove = web3.utils.toWei("1000");

        await mockToken.approve(mockTokenRegistry.address, feeToApprove, {
          from: accounts[0]
        });

        await mockTokenRegistry.lockEthAtPrice(amountToLock, 0, {
          from: accounts[0]
        });

        let lock = await mockTokenRegistry.priceLocks.call(0);
        console.log(lock);
      } else {
        console.log("already have first lock");
        let lock = await mockTokenRegistry.priceLocks.call(0);
        console.log(lock);
      }

      // Create token option offer
      let tokenOffer = null;
      if (
        (await mockTokenRegistry.getUserOffersLength.call(accounts[0])) == 1
      ) {
        console.log("creating new token option offer");
        const volatility = 8* 1000;
        const fee = 10 * 1000;
        const duration = 60 * 60 * 24 * 3;
        const minDuration = duration / 3;
        const maxAssets = web3.utils.toWei("5000");

        await mockToken.approve(mockTokenRegistry.address, maxAssets, {from:accounts[0]});

        await mockTokenRegistry.addOffer(
          [volatility, fee],
          [duration, minDuration, maxAssets, maxAssets],
          false,
          tokenExchange.address,
          { from: accounts[0] }
        );

        tokenOffer = await mockTokenRegistry.offers.call(1);
        console.log(tokenOffer);
      } else {
        console.log("already have Second offer");
        tokenOffer = await mockTokenRegistry.offers.call(1);
        console.log(tokenOffer);
      }

      // Create token price lock
      if ((await mockTokenRegistry.getUserLocksLength.call(accounts[0])) == 1) {
        console.log("creating new lock");
        const amountToLock = web3.utils.toWei("400");
        const feeToSend = web3.utils.toWei("0.1");

        await mockTokenRegistry.lockTokenAtPrice(amountToLock, 1, {
          from: accounts[0],
          value: feeToSend
        });

        let lock = await mockTokenRegistry.priceLocks.call(1);
        console.log(lock);
      } else {
        console.log("already have token lock");
        let lock = await mockTokenRegistry.priceLocks.call(1);
        console.log(lock);
      }

      callback();
    })
    .catch(err => {
      callback(err);
    });

};
