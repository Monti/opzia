import React, { Component } from "react";

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
  componentDidMount() {
    this.props.fetchUserOptions(this.props.accounts[0]);
  }
  render() {
    const { web3, user } = this.props;
    const offers = user.offers;
    console.log(offers);
    return (
      <Container>
        <Table
          columns={columns}
          dataSource={offers}
          render={source => {
            const curr =source.ethOrToken? "ETH" :"MCK";
            const days = source.duration/(60*60*24);
            return (
              <tr key={source.fee}>
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
  const { accounts, exchanges, contracts, web3, user } = state;
  console.log(user);
  return {
    accounts: accounts.accounts,
    exchanges,
    contracts,
    web3: web3.web3,
    user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenOffers);
