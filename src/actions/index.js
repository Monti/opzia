import getWeb3 from '../utils/getWeb3';

export const loadWeb3 = () => {
  return dispatch => {
    return dispatch({
      type: 'WEB3_INITIALIZED',
      payload: getWeb3,
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
      type: 'GET_ACCOUNTS',
      payload: web3.eth.getAccounts(),
    });
  };
};

export const loadContracts = web3 => {
  return (dispatch, getState) => {

    return dispatch({
      type: "LOAD_CONTRACTS",
    });
  };
};
