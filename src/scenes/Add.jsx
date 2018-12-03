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
      amountToken: null,
      selectedToken: null,
    };

    this.handleAmountClick = this.handleAmountClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleAmountClick(token) {
    this.setState({ amountToken: token });
  }

  handleClick(token) {
    this.setState({ selectedToken: token });
  }

  render() { 
    const { amountToken, selectedToken } = this.state;
    return (
      <Container>
        <form>
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
            <TextInput addon={amountToken} placeholder="Amount" />
          </InputGroup>
          <InputGroup>
            <InputItem>
              <label>Volatility</label>
              <TextInput noAddon placeholder="Amount" />
            </InputItem>
            <InputItem>
              <label>Fee</label>
              <TextInput noAddon placeholder="Amount" />
            </InputItem>
            <InputItem>
              <label>Duration</label>
              <TextInput noAddon placeholder="Amount" />
            </InputItem>
          </InputGroup>
          <InputGroup>
            <InputItem style={{ flex: 1, marginRight: '20px' }}>
              <label>Wait Time</label>
              <TextInput placeholder="Amount" noAddon />
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
            <Button>Add Option</Button>
          </Footer>
        </form>
      </Container>
    );
  }
}
 
export default Add;
