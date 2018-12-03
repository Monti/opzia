import React, { Component } from "react";

import Trade from "../components/Trade";
import Container from "../components/Container";

import { getTokenExchange } from "../actions";

import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);

    this.changeInputState = this.changeInputState.bind(this);
    this.fetchTradePrice = this.fetchTradePrice.bind(this);
  }
  state = {
    fromToken: {},
    toToken: {},
    fromAmount: 0,
    toAmount: 0
  };
  changeInputState(name, value) {
    const { fromToken, toToken } = this.state;
    this.setState({ [name]: value });
    if (
      name == "fromAmount" &&
      Number.isInteger(value) &&
      fromToken != toToken
    ) {
      this.fetchTradePrice(value);
    }
  }

  async fetchTradePrice(amount) {
    const { fromToken, toToken } = this.state;
    const { contracts, exchanges, getExchange, web3 } = this.props;
    let exchange = null;
    if (fromToken.symbol == "GO") {
      exchange = exchanges[toToken.address]
        ? exchanges[toToken.address]
        : (await getExchange(toToken.address)).payload.exchange;
      const price = await exchange.methods
        .getEthToTokenInputPrice(web3.utils.toWei(amount.toString()))
        .call();
      this.setState({ toAmount: web3.utils.fromWei(price) });
      return;
    } else if (toToken.symbol == "GO") {
      exchange = exchanges[fromToken.address]
        ? exchanges[fromToken.address]
        : (await getExchange(fromToken.address)).payload.exchange;
      const price = await exchange.methods
        .getTokenToEthInputPrice(web3.utils.toWei(amount.toString()))
        .call();
      this.setState({ toAmount: web3.utils.fromWei(price) });
      return;
    } else {
      exchange = exchanges[fromToken.address]
        ? exchanges[fromToken.address]
        : (await getExchange(fromToken.address)).payload.exchange;
    }
  }

  swap = async () => {
    const { fromToken, toToken, fromAmount } = this.state;
    const { exchanges, web3 } = this.props;

    
  };

  render() {
    const { contracts, accounts, exchanges } = this.props;
    const tokens = [
      { name: "Go", symbol: "GO", address: null },
      {
        name: "Mock",
        symbol: "MCK",
        address: contracts.token && contracts.token._address
      }
    ];
    const { fromAmount, toAmount, fromToken, toToken } = this.state;
    return (
      <Container>
        <Trade
          fromAmount={fromAmount}
          toAmount={toAmount}
          fromToken={fromToken}
          toToken={toToken}
          tokens={tokens}
          onInputChange={this.changeInputState}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { accounts, exchanges, contracts, web3 } = state;
  return {
    accounts,
    exchanges,
    contracts,
    web3: web3.web3
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExchange: async token => dispatch(getTokenExchange(token))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
