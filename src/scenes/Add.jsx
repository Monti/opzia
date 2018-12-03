import React, { Component } from 'react';
import styled from "styled-components";

import TradeItem from '../components/TradeItem';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

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

const tokens = [
  {
    "name": "GoChain",
    "symbol": "GO"
  },
  {
    "name": "Mock",
    "symbol": "MCK"
  },
  {
    "name": "Test",
    "symbol": "tst"
  },
  {
    "name": "Coin",
    "symbol": "Coi"
  },
  {
    "name": "Bitcoin",
    "symbol": "btc",
  }
];

const mainTokens = [
  {
    "name": "GoChain",
    "symbol": "GO"
  },
  {
    "name": "Mock",
    "symbol": "MCK"
  },
];

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountToken: '',
      selectedToken: '',
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

  handleAmountClick(token) {
    this.setState({ amountToken: token });
  }

  handleClick(token) {
    this.setState({ selectedToken: token });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
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
    } = this.state;

    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <InputGroup>
            <TradeList style={{ marginRight: '20px'}}>
              {tokens.map(item => (
                <TradeItem
                  item={item}
                  key={item.symbol}
                  selectedItem={amountToken}
                  handleClick={this.handleAmountClick}
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
                {mainTokens.map(item => (
                  <TradeItem
                    item={item}
                    key={item.symbol}
                    selectedItem={selectedToken}
                    handleClick={this.handleClick}
                  />
                ))}
              </TradeList>
            </InputItem>
          </InputGroup>
          <Footer>
            <div>Existing State: 0</div>
            <Button type="submit" onClick={() => {}}>Add Option</Button>
          </Footer>
        </form>
      </Container>
    );
  }
}
 
export default Add;
