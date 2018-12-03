import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import web3 from './web3';
import accounts from './accounts';
import contracts from './contracts';
import exchanges from './exchanges';
import user from './user';

export default (history) => combineReducers({
  router: connectRouter(history),
  web3,
  accounts,
  contracts,
  exchanges,
  user
});
