import React, { Component } from "react";
import _ from "lodash";

import Container from "../components/Container";
import Table from "../components/Table";

import { connect } from "react-redux";
import { fetchUserOptions } from "../actions";

import Button from "../components/Button";

const columns = [
  {
    title: "Token",
    dataIndex: "token",
    key: "token"
  },
  {
    title: "Go Amount",
    dataIndex: "goAmount",
    key: "goAmount"
  },
  {
    title: "Token Amount",
    dataIndex: "tokenAmount",
    key: "tokenAmount"
  },
  {
    title: "Time Left",
    dataIndex: "timeLeft",
    key: "timeLeft"
  },
  {
    title: "Take",
    dataIndex: "",
    key: ""
  }
];

class PurchasedOptions extends Component {
  callOption = async (token, isGo, lockIndex, givenAmount) => {
    const { registries, web3, accounts } = this.props;
    const registry = registries[token.address];
    const value = givenAmount;
    if (isGo) {
      const approveTx = token.contract.methods.approve(registry._address, value);
      const approveGas = await approveTx.estimateGas({ from: accounts[0] });
      await approveTx.send({ from: accounts[0], gas: approveGas * 2 });

      const tx = registry.methods.takeLock(lockIndex, value);
      const gas = await tx.estimateGas({ from: accounts[0] });
      await tx.send({ from: accounts[0], gas: gas * 2 });
      return;
    } else {
      const tx = registry.methods.takeLock(lockIndex, 0);

      const gas = await tx.estimateGas({ from: accounts[0], value });
      console.log(gas);
      await tx.send({ from: accounts[0], gas: gas * 2, value });
      return;
    }
  };
  render() {
    const { web3, user, tokens, offers } = this.props;
    const locks = user.locks;
    return (
      <Container>
        <Table
          columns={columns}
          dataSource={locks}
          render={source => {
            const token = tokens.find(
              token => token.address == source.tokenAddress
            );
            const offer = offers[source.tokenAddress][source.offerIndex];
            const curr = offer.ethOrToken ? "GO" : token.symbol;
            console.log(Date.now(), source.creation);
            const days = (
              (+source.creation + +offer.duration - Date.now() / 1000) /
              (60 * 60 * 24)
            ).toFixed(4);
            if ((days < 0, source.ethAmount == 0)) {
              return;
            }
            return (
              <tr key={_.uniqueId()}>
                <td>{curr}</td>
                <td>{`${(+web3.utils.fromWei(
                  source.ethAmount.toString()
                )).toFixed(4)} Go`}</td>
                <td>{`${(+web3.utils.fromWei(
                  source.tokenAmount.toString()
                )).toFixed(4)} ${token.symbol}`}</td>

                <td>{`${days} Days`}</td>
                <td>
                  <Button
                    onClick={() =>
                      this.callOption(
                        token,
                        offer.ethOrToken,
                        source.index,
                        offer.ethOrToken ? source.tokenAmount : source.ethAmount
                      )
                    }
                  >
                    {" "}
                    Call
                  </Button>
                </td>
              </tr>
            );
          }}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserOptions: async user => dispatch(fetchUserOptions(user))
  };
};

const mapStateToProps = state => {
  const {
    accounts,
    exchanges,
    contracts,
    web3,
    user,
    tokens,
    offers,
    registries
  } = state;
  return {
    accounts: accounts.accounts,
    exchanges,
    contracts,
    web3: web3.web3,
    user,
    tokens,
    offers,
    registries
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasedOptions);
