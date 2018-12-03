import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

const Item = styled.div`
  align-items: center;
  background-color: #F5F6F8;
  color: #ddd;
  cursor: pointer;
  display: flex;
  font-family: 'Rubik';
  font-size: 0.8em;
  font-weight: 700;
  height: 57px;
  justify-content: center;
  margin: 1px;
  width: 57px;
  transition: all 0.09s ease-in;

  &:hover {
    background: #27D5AC;
    color: #fff;
    transform: scale(1.2);
  }

  ${({ isActive }) => isActive && css`
    background: #1fa888;
    color: #fff;

    &:hover {
      background: #1fa888;
    }
  `}
`;

class TradeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps({ selectedItem }) {
    this.setState({ selectedItem });
  }

  handleClick() {
    this.props.handleClick(this.props.item);
  }

  render() { 
    const { selectedItem } = this.state;
    const { item } = this.props;

    return (
      <Item
        onClick={this.handleClick}
        isActive={_.isEqual(selectedItem, item)}>

        { item.symbol }

      </Item>
    );
  }
}
 
export default TradeItem;
