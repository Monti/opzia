import React, { Component, Fragment } from 'react';
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from '../Header';

import Home from '../../scenes/Home';
import OpenOffers from '../../scenes/OpenOffers';
import PurchasedOffers from '../../scenes/PurchasedOffers';

const ONE_SECOND = 1000;

const GlobalStyle = createGlobalStyle`
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
    console.log(web3)
    this.setState({ web3 });
  }

  pollAccounts() {
    if (!this.interval) {
      this.interval = setInterval(this.props.getAccounts, ONE_SECOND);
    }
  }

  render() {
    const { web3 } = this.state;
    const finishedLoading = !web3.isLoading;

    return (
      <Router>
        <Fragment>

        { finishedLoading &&
          <Fragment>
            <Header />

            <Route path="/" exact component={Home} />
            <Route path="/open-offers" exact component={OpenOffers} />
            <Route path="/purchased-offers" exact component={PurchasedOffers} />

          </Fragment>
        }

          <GlobalStyle />
        </Fragment>
      </Router>
    );
  }
};

export default App;
