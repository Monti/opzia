import { connect } from "react-redux";

import { loadWeb3, getAccounts } from "../actions";
import App from "../components/App";

const mapStateToProps = ({ web3, accounts }) => ({ web3, accounts });

const AppContainer = connect(
  mapStateToProps,
  {
    onLoad: loadWeb3,
    getAccounts
  }
)(App);

export default AppContainer;
