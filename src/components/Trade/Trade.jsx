import React, { Component, Fragment } from "react";
import styled from "styled-components";
import TradeItem from "../TradeItem";
import Conversion from "../Conversion";

const Wrapper = styled.div`
  margin-bottom: 50px;
`;

const TradeList = styled.div`
  display: flex;
  margin-left: -1px;
  margin-right: -1px;
`;

class Trade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null
    };
  }

  render() {
    const { tokens, fromToken, toToken, onInputChange } = this.props;

    return (
      <Fragment>
        <Wrapper>
          <Fragment>
            <TradeList>
              {tokens.map(item => (
                <TradeItem
                  item={item}
                  key={item.symbol}
                  selectedItem={fromToken}
                  handleClick={item => onInputChange("fromToken", item)}
                />
              ))}
            </TradeList>
            <TradeList>
              {tokens.map(item => (
                <TradeItem
                  item={item}
                  key={item.symbol}
                  selectedItem={toToken}
                  handleClick={item => onInputChange("toToken", item)}
                />
              ))}
            </TradeList>
          </Fragment>
        </Wrapper>
        <Conversion {...this.props} />
      </Fragment>
    );
  }
}

export default Trade;
