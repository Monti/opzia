import { connect } from 'react-redux';

import { loadWeb3, getAccounts } from '../actions';
import App from '../components/App';

const mapStateToProps = ({ web3, lottery }) => ({ web3, lottery  });

const AppContainer = connect(mapStateToProps, {
  onLoad: loadWeb3,
  getAccounts,
})(App);

export default AppContainer;
