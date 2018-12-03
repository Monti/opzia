import React, { Component, Fragment } from 'react';
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from '../Header';

import Home from '../../scenes/Home';
import Add from '../../scenes/Add';
import OpenOffers from '../../scenes/OpenOffers';
import TakeOffer from '../../scenes/TakeOffer';
import PurchasedOptions from '../../scenes/PurchasedOptions';

const ONE_SECOND = 1000;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  body > div {
    height: 100%;
  }

  body {
    font-family: 'Work Sans', sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

class App extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      web3: props.web3,
      lottery: props.lottery,
    };

    this.interval = null;
    this.pollAccounts = this.pollAccounts.bind(this);
  }

  componentDidMount() {
    this.props.onLoad();
    // this.pollAccounts();
  }

  componentWillReceiveProps({ web3 }) {

    this.setState({ web3 });
  }

  pollAccounts() {
    if (!this.interval) {
      this.interval = setInterval(this.props.getAccounts, ONE_SECOND);
    }
  }

  render() {
    const { web3 } = this.state;
    const {accounts} = this.props;
    const finishedLoading = !web3.isLoading && accounts.accountChanged;

    return (
      <Router>
        <Fragment>

          { finishedLoading &&
            <Fragment>
              <Header />

              <Route path="/" exact component={Home} />
              <Route path="/add" exact component={Add} />
              <Route path="/take/:from/:to/:fromAmount/:toAmount" component={TakeOffer} />
              <Route path="/open-offers" exact component={OpenOffers} />
              <Route path="/purchased-offers" exact component={PurchasedOptions} />

            </Fragment>
          }

          <GlobalStyle />
        </Fragment>
      </Router>
    );
  }
};

export default App;
