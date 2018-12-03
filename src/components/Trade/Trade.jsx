import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import TradeItem from '../TradeItem';
import Conversion from '../Conversion';

import tradeList from './trade-list.json';

const Wrapper = styled.div`
  margin: 50px 0;
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

    return (
      <Fragment>
        <Wrapper>
          <Fragment>
            <TradeList>
              { tradeList.map(item => (
                <TradeItem
                  item={item}
                  key={item.symbol}
                  selectedItem={from}
                  handleClick={this.selectFrom} />
              ))}
            </TradeList>
            <TradeList>
              { tradeList.map(item => (
                <TradeItem
                  item={item}
                  key={item.symbol}
                  selectedItem={to}
                  handleClick={this.selectTo} />
              ))}

            </TradeList>

          </Fragment>
        </Wrapper>
        <Conversion {...this.state} />
      </Fragment>
    );
  }
}
 
export default Trade;
