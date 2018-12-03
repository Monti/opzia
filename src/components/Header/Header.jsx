import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Container from '../Container';

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  height: 80px;
  justify-content: center;
  margin-bottom: 50px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  align-items: center;
  display: flex;

  h1 {
    font-family: 'Rubik';
    font-size: 1.1em;
    font-weight: 900;
    text-transform: uppercase;
  }

  a {
    color: #000000;
    text-decoration: none;
  }

  &::after {
    content: "";
    background: rgb(0, 224, 142);
    border-radius: 50%;
    display: block;
    height: 5px;
    margin-left: 5px;
    width: 5px;
  }

  &:hover::after {
    position: relative;
    top: -8px;
  }
`;

const Menu = styled.div`
  display: flex;

  a {
    font-size: 0.85em;
    color: #2b2b2b;
    text-decoration: none;
    margin-left: 30px;
    position: relative;

    &::after {
      content: "";
      background: transparent;
      border-radius: 50%;
      display: block;
      height: 5px;
      margin-left: 5px;
      width: 5px;
      position: absolute;
      right: -8px;
      top: 0;
    }

    &.active::after,
    &:hover::after {
      background: rgb(0, 224, 142);
    }
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.buyTickets();
  }

  render() { 
    return (
      <StyledHeader>
        <Container>
          <Wrapper>
            <Title>
              <h1>
                <NavLink to="/">Opzia</NavLink>
              </h1>
            </Title>
            <Menu>
              <NavLink to="/add">Add Option Offer</NavLink>
              <NavLink to="/open-offers">Open Offers</NavLink>
              <NavLink to="/purchased-options">Purchased Options</NavLink>
            </Menu>
          </Wrapper>
        </Container>
      </StyledHeader>
    );
  }
}
 
export default Header;
