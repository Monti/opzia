import React, { Component } from "react";

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
  },
  {
    title: "Take",
    dataIndex: "take",
    key: "take"
  }
];

class OpenOffers extends Component {
  componentDidMount() {
    this.props.fetchUserOptions(this.props.accounts[0]);
  }

  takeOffer = async (offerIndex, assetsToTake, fees, goOrToken, symbol) => {
    const { tokens, registries, web3, accounts } = this.props;
    const tokenObj = tokens.find(token => token.symbol == symbol);
    const token = tokenObj.contract;

    const registry = registries[tokenObj.address];
    if (goOrToken) {
      // Handle go locks
      const approveTx = token.methods.approve(
        registry._address,
        web3.utils.toWei((fees * 2).toString())
      );
      const approveGas = await approveTx.estimateGas({ from: accounts[0] });
      console.log(approveGas);
      await approveTx.send({ from: accounts[0], gas: approveGas * 2 });

      const tx = registry.methods.lockEthAtPrice(
        web3.utils.toWei(assetsToTake.toString()),
        offerIndex
      );
      const gas = tx.estimateGas({ from: accounts[0] });
      await tx.send({ from: accounts[0], gas: gas * 2 });
    } else {
      // Handle token locks
      const tx = registry.methods.lockTokenAtPrice(
        web3.utils.toWei(assetsToTake.toString()),
        offerIndex
      );
      const gas = await tx.estimateGas({
        from: accounts[0],
        value: web3.utils.toWei((fees * 2).toString())
      });
      await tx.send({
        from: accounts[0],
        value: web3.utils.toWei((fees * 2).toString()),
        gas: gas * 2
      });
    }
  };

  render() {
    const { web3, rawOffers, match, tokens } = this.props;
    const { from, to, fromAmount, toAmount } = match.params;
    const goOrToken = to == "GO" ? true : false;
    const token = goOrToken
      ? tokens.find(token => token.symbol == from)
      : tokens.find(token => token.symbol == to);
    if (!token){
      return <div>LOADING</div>
    }
    if (!rawOffers[token.address]){
      return <data>LOADING</data>
    }
    const offers = Object.values(rawOffers[token.address])
      .map((val, idx) => {
        val["index"] = idx;
        return val;
      })
      .filter(val => val.ethOrToken == goOrToken);

    return (
      <Container>
        <Table
          columns={columns}
          dataSource={offers}
          render={source => {
            console.log(fromAmount);
            const curr = to;
            const days = source.duration / (60 * 60 * 24);
            const fees =
              (source.volatility * +source.fee * +fromAmount) / 1000000 ** 2;
            return (
              <tr key={source.index}>
                <td>{curr}</td>
                <td>{`${source.volatility / 1000} %`}</td>
                <td>{`${fees} ${from}`}</td>
                <td>{`${days} Days`}</td>
                <td>{`${web3.utils.fromWei(
                  source.maxAssetsLocked
                )} ${curr}`}</td>
                <td>
                  <Button
                    onClick={() =>
                      this.takeOffer(
                        source.index,
                        toAmount,
                        fees,
                        source.ethOrToken,
                        to == "GO" ? from : to
                      )
                    }
                  >
                    {" "}
                    Take
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
    offers,
    registries,
    tokens
  } = state;
  return {
    accounts: accounts.accounts,
    exchanges,
    contracts,
    web3: web3.web3,
    rawOffers: offers,
    registries,
    tokens
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenOffers);
