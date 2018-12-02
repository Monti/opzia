import React, { Component } from "react";
import Link from "next/link";
import Web3Container from "../lib/Web3Container";
import styled from "styled-components";
import PageWrapper from "../components/CommonComponents/PageWrapper";
import TextField from "@material-ui/core/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import NoSsr from "@material-ui/core/NoSsr";
import Button from "@material-ui/core/Button";

import MaterialSelect from "../components/Select/Select";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const testTokens = [
  { symbol: "GO", price: 1, decimals: 18, address: "GOADDRESS" },
  { symbol: "test", price: 555, decimals: 18, address: "a" },
  { symbol: "mock", price: 18, decimals: 18, address: "v" }
];

const testOptions = {
  a: [{ volatility: 50000, duration: 60 * 60 * 24 * 3, fee: 50000 }],
  v: [{ volatility: 76000, duration: 60 * 60 * 24 * 6, fee: 40000 }]
};

const Container = styled.div`
  display: flex;
  width: 840px;
  min-height: 640px;
  align-self: center;
  text-align: center;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  height: 80px;
  margin: 16px 0;
`;
const Item = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;

  width: ${props => (props.width ? `${props.width * 100}%` : "30%")};
`;

const ActionButton = styled(Button)`
width:240px;
`

const CryptoSelector = ({
  value,
  currencies,
  onValChange,
  currency,
  onCurrencyChange,
  displayNum
}) => {
  const selectOptions = currencies.map(curr => ({
    value: curr.symbol,
    label: curr.symbol
  }));
  return (
    <Row>
      <NoSsr>
        <Item width={0.45} style={{ marginRight: 10 }}>
          <TextField
            value={value}
            disabled={!displayNum}
            onChange={onValChange}
            label="Amount"
          />
        </Item>

        <Item width={0.45}>
          <MaterialSelect
            value={currency}
            onSelect={onCurrencyChange}
            placeholder="Token"
            suggestions={selectOptions}
          />
        </Item>
      </NoSsr>
    </Row>
  );
};

const Swap = class SignUpForm extends Component {
  constructor(props) {
    super(props);
  }
  renderInput(item) {
    return item.symbol;
  }

  renderItem(item) {
    return <li>{item.symbol}</li>;
  }
  state = {
    amountFrom: null,
    fromToken: null,
    toToken: null
  };

  setToken(name, val) {
    console.log(name, val);
    this.setState({
      [name]: this.props.tokens.find(tok => {
        return tok.symbol == val;
      })
    });
  }

  render() {
    const { tokens } = this.props;
    const { toToken, fromToken, amountFrom } = this.state;

    const tokensSelected = toToken && fromToken;
    const price = tokensSelected ? toToken.price / fromToken.price : "Nan";
    const amount = price != "Nan" && amountFrom ? price * amountFrom : "Nan";
    return (
      <PageWrapper>
        <Container>
        <Card>
          <CardContent>
          <Row>
            <Item>
              <CryptoSelector
                displayNum
                value={amountFrom}
                onValChange={e => this.setState({ amountFrom: e.target.value })}
                currency={fromToken && fromToken.symbol}
                currencies={tokens}
                onCurrencyChange={val => this.setToken("fromToken", val.value)}
              />
            </Item>
            <Item>
              <FontAwesomeIcon style={{ marginTop: 20 }} icon={faArrowRight} />
            </Item>
            <Item>
              <CryptoSelector
                value={amount && (+amount).toFixed(4)}
                currency={toToken && toToken.symbol}
                currencies={tokens}
                onCurrencyChange={val => this.setToken("toToken", val.value)}
              />
            </Item>
          </Row>
          <Row>
            <Item>Average Rate: {price}</Item>
          </Row>
          
          {tokensSelected ? (
            <Row>
              <Item>
                <ActionButton variant="contained">Swap</ActionButton>
              </Item>
            </Row>
          ) : (
            <Row>
              <Item>
                <ActionButton disabled variant="contained"> Select Tokens To Swap</ActionButton>
              </Item>
            </Row>
          )}

          {tokensSelected &&
          (toToken.symbol == "GO" || fromToken.symbol == "GO") ? (
            <Row>
              <Item>
                <Link href={{ pathname: '/options', query: { toToken:toToken.symbol, fromToken:fromToken.symbol, amount } }}><ActionButton variant="contained">Lock Rate This Rate</ActionButton></Link>
              </Item>
            </Row>
          ) : 
            ""
          }
          </CardContent>
         
        </Card>
        </Container>
      </PageWrapper>
    );
  }
};
export default () => <Swap tokens={testTokens} options={testOptions} />;
// export default () => (
//   <Web3Container
//     renderLoading={() => <div>Loading Swap Page...</div>}
//     render={({ accounts }) => <Swap accounts={accounts} />}
//   />
// );
