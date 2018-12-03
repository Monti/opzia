import React, { Component } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";

import TradeItem from '../components/TradeItem';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

import { getTokenExchange } from "../actions";

const TradeList = styled.div`
  display: flex;
  align-items: flex-end;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const InputItem = styled.div`
  > label {
    color: #ddd;
    font-size: 0.9em;
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;


class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registry: null,
      amountToken: null,
      selectedToken: null,
      goOrToken:true,
      amount: '',
      volatility: '',
      fee: '',
      duration: '',
      wait: '',
    };

    this.handleAmountClick = this.handleAmountClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAmountClick = async (token) => {
    const { registries } = this.props;
    const registry = registries[token.address];

    this.setState({ amountToken: token, registry });
  }

  handleClick(token) {
    this.setState({ selectedToken: token });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { web3, accounts, exchanges } = this.props;
    const maxAssets = web3.utils.toWei("5000");

    const {
      amountToken,
      registry,
      amount,
      volatility,
      fee,
      duration,
      wait,
      goOrToken,
      selectedToken
    } = this.state;
    const value = web3.utils.toWei(amount.toString());
    if (goOrToken){
      const tx =  registry.methods.addOffer(
        [volatility*1000000, fee*1000000],
        [duration*60*60*24, wait*60*60, value, value],
        true,
        exchanges[selectedToken.address]._address);
      const gas = await tx.estimateGas({from:accounts[0], value});
      await tx.send({from:accounts[0], value, gas:gas*2})
    }
    else{
      const approveTx = selectedToken.contract.methods.approve(registry._address, value);
      const approveGas = await approveTx.estimateGas({from:accounts[0]});
      await approveTx.send({from:accounts[0], gas:approveGas*2})

      const tx =  registry.methods.addOffer(
        [volatility*1000000, fee*1000000],
        [duration*60*60*24, wait*60*60, value, value],
        false,
        exchanges[selectedToken.address]._address);
      const gas = await tx.estimateGas({from:accounts[0]});
      await tx.send({from:accounts[0], gas:gas*2})
    }
    

  }

  onChange(type, amount) {
    this.setState({ [type]: amount });
  }

  render() { 
    const {
      amountToken,
      selectedToken,
      volatility,
      amount,
      fee,
      wait,
      duration,
      goOrToken
    } = this.state;

    const { tokens } = this.props;

    return (
      <Container>
        <form onSubmit={e => this.handleSubmit(e)}>
          <InputGroup>
            <TradeList style={{ marginRight: '20px'}}>
              {tokens.filter(token=>token.symbol!="GO").map(item => (
                <TradeItem
                  item={item}
                  key={item.symbol}
                  selectedItem={amountToken}
                  handleClick={item => {this.handleAmountClick(item)
                  this.handleClick(item)}}
                />
              ))}
            </TradeList>
            <TextInput
              value={amount}
              onChange={e => this.onChange("amount", e.target.value)}
              addon={amountToken}
              placeholder="Amount" />
          </InputGroup>
          <InputGroup>
            <InputItem>
              <label>Volatility</label>
              <TextInput
                noAddon
                value={volatility}
                onChange={e => this.onChange("volatility", e.target.value)}
                placeholder="Amount" />
            </InputItem>
            <InputItem>
              <label>Fee</label>
              <TextInput
                noAddon
                value={fee}
                onChange={e => this.onChange("fee", e.target.value)}
                placeholder="Amount" />
            </InputItem>
            <InputItem>
              <label>Duration</label>
              <TextInput
                noAddon
                value={duration}
                onChange={e => this.onChange("duration", e.target.value)}
                placeholder="Amount" />
            </InputItem>
          </InputGroup>
          <InputGroup>
            <InputItem style={{ flex: 1, marginRight: '20px' }}>
              <label>Wait Time</label>
              <TextInput
                noAddon
                value={wait}
                onChange={e => this.onChange("wait", e.target.value)}
                placeholder="Amount" />
            </InputItem>
            <InputItem style={{ display: 'flex' }}>
              <TradeList>
                
                  <TradeItem
                    item={ {name:"Go", symbol:"GO"}}
                    key={"GO"}
                    selectedItem={goOrToken? {name:"Go", symbol:"GO"}: {}}
                    handleClick={()=>this.setState({goOrToken:!goOrToken})}
                  />
               
              </TradeList>
            </InputItem>
          </InputGroup>
          <Footer>
            
            <Button type="button">Add Option</Button>
          </Footer>
        </form>
      </Container>
    );
  }
}
 
const mapStateToProps = state => {
  const { accounts, exchanges, contracts, web3, tokens, registries } = state;
  return {
    accounts: accounts.accounts,
    exchanges,
    contracts,
    registries,
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
)(Add);
