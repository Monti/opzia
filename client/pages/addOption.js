import React, { Component } from "react";
import Link from "next/link";
import Web3Container from "../lib/Web3Container";
import styled from "styled-components";
import PageWrapper from "../components/CommonComponents/PageWrapper";
import TextField from "@material-ui/core/TextField";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import NoSsr from "@material-ui/core/NoSsr";
import Button from "@material-ui/core/Button";

import MaterialSelect from "../components/Select/Select";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

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
  width: 240px;
`;

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

const AddOption = class AddOption extends Component {
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
    newStake: null,
    volatility: null,
    token: null,
    duration: null,
    minDuration: null,
    fee: null,
    goOrToken: true
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
    const {
      newStake,
      volatility,
      token,
      duration,
      minDuration,
      fee,
      goOrToken
    } = this.state;

    return (
      <PageWrapper>
        <Container>
          <Card raised>
            <CardContent>
              <Row>
                <Item>
                  <CryptoSelector
                    displayNum
                    value={newStake}
                    onValChange={e =>
                      this.setState({ amountFrom: e.target.value })
                    }
                    currency={token && token.symbol}
                    currencies={tokens}
                    onCurrencyChange={val => this.setToken("token", val.value)}
                  />
                </Item>
              </Row>
              <NoSsr>
                <Row>
                  <Item>
                    <TextField
                      value={volatility}
                      onChange={e =>
                        this.setState({ volatility: e.target.value })
                      }
                      label="Volatility"
                    />
                  </Item>
                  <Item>
                    <TextField
                      value={fee}
                      onChange={e => this.setState({ fee: e.target.value })}
                      label="Fee"
                    />
                  </Item>
                  <Item>
                    <TextField
                      value={duration}
                      onChange={e =>
                        this.setState({ duration: e.target.value })
                      }
                      label="Duration"
                    />
                  </Item>
                  
                </Row>
                <Row>
                <Item>
                    <TextField
                      value={minDuration}
                      onChange={e =>
                        this.setState({ minDuration: e.target.value })
                      }
                      label="Wait Time"
                    />
                  </Item>
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={goOrToken}
                          onChange={() => this.setState({goOrToken:!goOrToken})}
                          value="checkedB"
                          color="primary"
                        />
                      }
                      label={goOrToken? "Go" : token && token.symbol}
                    />
                  </Item>
                </Row>
                <Row>
                  <Item>Existing Stake: {0}</Item>
                </Row>
                <Row>
                  <Item>
                    <ActionButton>Add Option</ActionButton>
                  </Item>
                </Row>
              </NoSsr>
            </CardContent>
          </Card>
        </Container>
      </PageWrapper>
    );
  }
};
export default () => <AddOption tokens={testTokens} options={testOptions} />;
// export default () => (
//   <Web3Container
//     renderLoading={() => <div>Loading Swap Page...</div>}
//     render={({ accounts }) => <Swap accounts={accounts} />}
//   />
// );
