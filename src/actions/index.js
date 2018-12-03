import getWeb3 from "../utils/getWeb3";

var MockToken = require("../contracts/MockToken.json");
var UniswapFactory = require("../contracts/uniswap_factory.json");
var OpziaFactory = require("../contracts/OptionRegistryFactory.json");
var OpziaRegistry = require("../contracts/OptionRegistry.json");

var UniswapExchange = require("../contracts/uniswap_exchange.json");

export const loadWeb3 = () => {
  return dispatch => {
    return dispatch({
      type: "WEB3_INITIALIZED",
      payload: getWeb3()
    }).then(() => {
      dispatch(getAccounts()).then(() => {
        dispatch(loadTokens());
        dispatch(loadContracts());
      });
    });
  };
};

export const getAccounts = () => {
  return (dispatch, getState) => {
    const { web3 } = getState().web3;

    return dispatch({
      type: "GET_ACCOUNTS",
      payload: web3.eth.getAccounts()
    });
  };
};

export const loadContracts = () => {
  return async (dispatch, getState) => {
    const { web3 } = getState().web3;
    
    const optionFactory = new web3.eth.Contract(
      OpziaFactory.abi,
      OpziaFactory.networks[5777].address
    );
    const uniswapFactory = new web3.eth.Contract(
      UniswapFactory.abi,
      UniswapFactory.networks[5777].address
    );
    return dispatch({
      type: "LOAD_CONTRACTS",
      payload: {
        
        optionFactory,
        uniswapFactory
      }
    });
  };
};

export const getTokenExchange = tokenAddress => {
  return async (dispatch, getState) => {
    const { web3 } = getState().web3;
    const { uniswapFactory } = getState().contracts;

    const exchangeAddress = await uniswapFactory.methods
      .getExchange(tokenAddress)
      .call();
    const exchange = new web3.eth.Contract(
      UniswapExchange.abi,
      exchangeAddress
    );
    return dispatch({
      type: "FETCHED_TOKEN_EXCHANGE",
      payload: {
        tokenAddress,
        exchange
      }
    });
  };
};

export const getTokenRegistry = tokenAddress => {
  return async (dispatch, getState) => {
    const { web3 } = getState().web3;
    const { optionFactory } = getState().contracts;

    const registryAddress = await optionFactory.methods
      .tokenToRegistry(tokenAddress)
      .call();
    const registry = new web3.eth.Contract(OpziaRegistry.abi, registryAddress);
    return dispatch({
      type: "FETCHED_TOKEN_REGISTRY",
      payload: {
        tokenAddress,
        registry
      }
    });
  };
};

export const fetchUserStuff = (tokenAddress, userAddress) => {
  return async (dispatch, getState) => {
    const { web3 } = getState().web3;
    const { optionFactory } = getState().contracts;

    const registryAddress = await optionFactory.methods
      .tokenToRegistry(tokenAddress)
      .call();
    const registry = new web3.eth.Contract(OpziaRegistry.abi, registryAddress);
    const length = await registry.methods
      .getUserOffersLength(userAddress)
      .call();
    for (let i = 0; i < length; i++) {
      let offerIndex = await registry.methods
        .userToOffers(userAddress, i)
        .call();
      let offer = await registry.methods.offers(offerIndex).call();

      offer["tokenAddress"] = tokenAddress;
      offer["index"] = i;
      dispatch({
        type: "FETCHED_USER_OFFER",
        payload: {
          offer
        }
      });
    }
    const lockLength = await registry.methods
      .getUserLocksLength(userAddress)
      .call();
    for (let i = 0; i < lockLength; i++) {
      let lockIndex = await registry.methods.userToLocks(userAddress, i).call();
      let lock = await registry.methods.priceLocks(lockIndex).call();
      lock["index"] = i;
      lock["tokenAddress"] = tokenAddress;
      dispatch({
        type: "FETCHED_USER_LOCK",
        payload: {
          lock
        }
      });
    }
  };
};

export const loadAllOffers = tokenAddress => {
  return async (dispatch, getState) => {
    console.log(tokenAddress);
    const { web3 } = getState().web3;
    const { optionFactory } = getState().contracts;

    const registryAddress = await optionFactory.methods
      .tokenToRegistry(tokenAddress)
      .call();
    const registry = new web3.eth.Contract(OpziaRegistry.abi, registryAddress);
    const length = await registry.methods.getOffersLength().call();
    for (let i = 0; i < length; i++) {
      let offer = await registry.methods.offers(i).call();

      dispatch({
        type: "FETCHED_OFFER",
        payload: {
          tokenAddress,
          index: i,
          offer
        }
      });
    }
  };
};

const tokenAddresses = [
  "0x71239FEe0b29937f37a8484aE375F0b7a05564A1",
  "0x456a919D4E1A70ec66f257c8395E73fc4053FD65",
  "0xD22eAc93e95F5c6C94a35F102137f36ba01E4eB9"
];
export const loadTokens = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: "FETCHED_TOKEN",
      payload: {
        contract: null,
        name: "Go",
        symbol: "GO",
        address: null
      }
    });
    const { web3 } = getState().web3;
    const { accounts } = getState().accounts;
    tokenAddresses.map(async address => {
      const tokenContract = new web3.eth.Contract(MockToken.abi, address);
      const symbol = await tokenContract.methods.symbol().call();
      const name = await tokenContract.methods.name().call();
      dispatch(getTokenRegistry(address));
      dispatch(fetchUserStuff(address, accounts[0]));
      dispatch(loadAllOffers(address));
      dispatch({
        type: "FETCHED_TOKEN",
        payload: {
          contract: tokenContract,
          name,
          symbol,
          address
        }
      });
    });
  };
};

export const fetchUserOptions = userAddress => {
  return async (dispatch, getState) => {
    const { web3 } = getState().web3;
    const { optionFactory, token } = getState().contracts;

    const registryAddress = await optionFactory.methods
      .tokenToRegistry(token._address)
      .call();
    const registry = new web3.eth.Contract(OpziaRegistry.abi, registryAddress);
    const length = await registry.methods
      .getUserOffersLength(userAddress)
      .call();
    for (let i = 0; i < length; i++) {
      let offerIndex = await registry.methods
        .userToOffers(userAddress, i)
        .call();
      let offer = await registry.methods.offers(offerIndex).call();

      dispatch({
        type: "FETCHED_USER_OFFER",
        payload: {
          index: i,
          offer
        }
      });
    }
  };
};
