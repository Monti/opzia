import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import web3 from './web3';
import accounts from './accounts';
import contracts from './contracts';
import exchanges from './exchanges';
import registries from './registries';
import user from './user';
import offers from './offers';
import tokens from './tokens';

export default (history) => combineReducers({
  router: connectRouter(history),
  web3,
  accounts,
  contracts,
  exchanges,
  user,
  offers,
  registries,
  tokens
});
