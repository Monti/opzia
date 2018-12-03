import getWeb3 from "../utils/getWeb3";

var MockToken = require("../contracts/MockToken.json");
var UniswapFactory = require("../contracts/uniswap_factory.json");
var OpziaFactory = require("../contracts/OptionRegistryFactory.json");

var UniswapExchange = require("../contracts/uniswap_exchange.json");

export const loadWeb3 = () => {
  return dispatch => {
    return dispatch({
      type: "WEB3_INITIALIZED",
      payload: getWeb3
    }).then(() => {
      dispatch(getAccounts());
      dispatch(loadContracts());
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
    const tokenContract = new web3.eth.Contract(
      MockToken.abi,
      MockToken.networks[5777].address
    );
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
        token: tokenContract,
        optionFactory,
        uniswapFactory
      }
    });
  };
};

export const getTokenExchange = (tokenAddress) => {
  return async (dispatch, getState) => {
    const { web3 } = getState().web3;
    const { uniswapFactory } = getState().contracts;
    
    const exchangeAddress = await uniswapFactory.methods.getExchange(tokenAddress).call();
    const exchange = new web3.eth.Contract(UniswapExchange.abi, exchangeAddress)
    return dispatch({
      type: "FETCHED_TOKEN_EXCHANGE",
      payload: {
        tokenAddress,
        exchange
      }
    });
  };
};