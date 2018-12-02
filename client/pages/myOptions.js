import React, { Component } from "react";
import Link from "next/link";
import Web3Container from "../lib/Web3Container";
import styled from "styled-components";
import PageWrapper from "../components/CommonComponents/PageWrapper";
import * as moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import NoSsr from "@material-ui/core/NoSsr";
import Button from "@material-ui/core/Button";

import MaterialSelect from "../components/Select/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SortableTable from "../components/SortableTable";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { withRouter } from "next/router";

const testTokens = [
  { symbol: "ETH", price: 1, decimals: 18, address: "ETHADDRESS" },
  { symbol: "test", price: 555, decimals: 18, address: "a" },
  { symbol: "mock", price: 18, decimals: 18, address: "v" }
];

const testOptions = {
  a: [
    {
      volatility: 50000,
      duration: 60 * 60 * 24 * 3 + 4 * 360,
      fee: 50000,
      minDuration: 60 * 60 * 24
    }
  ],
  v: [
    {
      volatility: 76000,
      duration: 60 * 60 * 24 * 6,
      fee: 40000,
      minDuration: 60 * 60 * 24
    }
  ]
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
    const { tokens, options, router } = this.props;
    console.log(router);
    const { toToken, fromToken } = router.router.query;

    const tokensSelected = toToken && fromToken;
    
    return (
      <PageWrapper>
        <Container>
          <Card>
            <CardContent>
              <NoSsr>
                {`${toToken}/${fromToken} Options`}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell numeric>Volatility</TableCell>
                      <TableCell numeric>Fee</TableCell>
                      <TableCell numeric>Wait Time</TableCell>
                      <TableCell numeric>Duration</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {options["a"].map(option => {
                      const optionWait = moment.duration(
                        option.minDuration,
                        "seconds"
                      );
                      const optionDuration = moment.duration(
                        option.duration,
                        "seconds"
                      );

                      return (
                        <TableRow key={option.volatility}>
                          <TableCell numeric>{option.volatility}</TableCell>
                          <TableCell numeric>{option.fee}</TableCell>

                          <TableCell numeric>{optionWait.days()}</TableCell>
                          <TableCell numeric>{optionDuration.days()}</TableCell>
                          <TableCell>
                            <Button>Lock</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </NoSsr>
            </CardContent>
          </Card>
        </Container>
      </PageWrapper>
    );
  }
};
export default withRouter(router => (
  <Swap tokens={testTokens} router={router} options={testOptions} />
));
// export default () => (
//   <Web3Container
//     renderLoading={() => <div>Loading Swap Page...</div>}
//     render={({ accounts }) => <Swap accounts={accounts} />}
//   />
// );
