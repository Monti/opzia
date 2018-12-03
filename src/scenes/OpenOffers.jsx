import React, { Component } from "react";
import _ from 'lodash';

import Container from "../components/Container";
import Table from "../components/Table";

import { connect } from "react-redux";
import { fetchUserOptions } from "../actions";

const columns = [
  {
    title: "Token",
    dataIndex: "token",
    key: "token"
  },
  {
    title: "Predicted Volatility",
    dataIndex: "volatility",
    key: "volatility"
  },
  {
    title: "Fees",
    dataIndex: "fee",
    key: "fee"
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration"
  },
  {
    title: "Maximal Assets Locked",
    dataIndex: "maxAssets",
    key: "maxAssets"
  }
];

class OpenOffers extends Component {

  render() {
    const { web3, user, tokens } = this.props;
    const offers = user.offers;
    return (
      <Container>
        <Table
          columns={columns}
          dataSource={offers}
          render={source => {
            const token = tokens.find(token=> token.address==source.tokenAddress)
            const curr =source.ethOrToken? "GO" : token.symbol;
            const days = source.duration/(60*60*24);
            return (
              <tr key={_.uniqueId()}>
                <td>{curr}</td>
                <td>{`${source.volatility/1000} %`}</td>
                <td>{`${source.fee/1000} %`}</td>
                <td>{`${days} Days`}</td>
                <td>{`${web3.utils.fromWei(source.maxAssetsLocked)} ${curr}`}</td>
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
  const { accounts, exchanges, contracts, web3, user, tokens } = state;
  return {
    accounts: accounts.accounts,
    exchanges,
    contracts,
    web3: web3.web3,
    user,
    tokens
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenOffers);
