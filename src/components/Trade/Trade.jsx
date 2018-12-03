import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import TradeItem from '../TradeItem';
import Conversion from '../Conversion';


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
      to: null,
    };

    this.selectFrom = this.selectFrom.bind(this);
    this.selectTo = this.selectTo.bind(this);
  }


  selectFrom(from) {
    this.setState({ from });
  }

  selectTo(to) {
    this.setState({ to });
  }

  render() {
    const { from, to } = this.state;
    const {tokens, fromAmount, toAmount, fromToken, toToken, onInputChange} = this.props;

    return (
      <Fragment>
        <Wrapper>
          <Fragment>
            <TradeList>
              { tokens.map(item => (
                <TradeItem
                  item={item}
                  key={item.symbol}
                  selectedItem={fromToken}
                  handleClick={(item)=>onInputChange("fromToken", item)} />
              ))}
            </TradeList>
            <TradeList>
              { tokens.map(item => (
                <TradeItem
                  item={item}
                  key={item.symbol}
                  selectedItem={toToken}
                  handleClick={(item)=>onInputChange("toToken", item)} />
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
