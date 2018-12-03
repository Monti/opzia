import React, { Component } from "react";

import Trade from "../components/Trade";
import Container from "../components/Container";

import { getTokenExchange } from "../actions";

import { connect } from "react-redux";

const initialState = {
  fromToken: {},
  toToken: {},
  fromAmount: 0,
  toAmount: 0
};
class Home extends Component {
  constructor(props) {
    super(props);

    this.changeInputState = this.changeInputState.bind(this);
    this.fetchTradePrice = this.fetchTradePrice.bind(this);
  }
  state = initialState;
  changeInputState(name, value) {
    const { fromToken, toToken } = this.state;
    this.setState({ [name]: value });
    if (
      name == "fromAmount" &&
      Number.isInteger(+value) &&
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
      console.log(price)
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

  approve = async (token, amount, address, web3, accounts) => {
    const tx = token.methods.approve(address, web3.utils.toWei(amount));

    let gas = await tx.estimateGas({ from: accounts[0] });
    let rec = await tx.send({ from: accounts[0], gas });
    return rec;
  };

  swap = async () => {
    const { fromToken, toToken, fromAmount } = this.state;
    const { exchanges, web3, contracts, accounts } = this.props;

    let exchange;
    if (toToken.symbol == "GO") {
      exchange = exchanges[fromToken.address];
      await this.approve(
        fromToken.contract,
        fromAmount,
        exchange._address,
        web3,
        accounts
      );
      const tx = exchange.methods.tokenToEthSwapInput(
        web3.utils.toWei(fromAmount),
        1,
        Math.floor(Date.now() / 1000) + 500
      );
      const gas = await tx.estimateGas({ from: accounts[0] });
      console.log(gas);
      await tx.send({ gas, from: accounts[0] });
      this.setState(initialState);
      return;
    }

    if (fromToken.symbol == "GO") {
      exchange = exchanges[toToken.address];
      const tx = exchange.methods.ethToTokenSwapInput(
        10,
        Math.floor(Date.now() / 1000) + 500
      );
      const gas = await tx.estimateGas({
        from: accounts[0],
        value: web3.utils.toWei(fromAmount.toString())
      });
      console.log(gas);
      await tx.send({
        from: accounts[0],
        value: web3.utils.toWei(fromAmount.toString()),
        gas:gas*2
      });
      return;
    }
  };

  render() {
    const { tokens} = this.props;
    
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
          onSwap={this.swap}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { accounts, exchanges, contracts, web3, tokens } = state;
  return {
    accounts: accounts.accounts,
    exchanges,
    contracts,
    web3:  web3.web3,
    tokens
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
