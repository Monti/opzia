import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  background: transparent;
  border: 1px solid #000000;
  color: #000000;
  left: 0;
  padding: 6px 12px;
  position: fixed;
  top: 40px;
  transform: translate(-100%, 0);
  transition: transform 0.09s ease-in;

  ${({ isOpen }) => isOpen && css`
    transform: translate(20px, 0);
  `}
`;

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketsBought: false,
    };

    this.close = this.close.bind(this);
  }

  componentWillReceiveProps({ tickets }) {
    if (this.props.tickets.ticketsBought !== tickets.ticketsBought) {
      this.setState({ ticketsBought: tickets.ticketsBought }, this.close);
    }
  }

  close() {
    setTimeout(() => {
      this.setState({
        ticketsBought: false,
      });
    }, 5000);
  }

  render() { 
    const { ticketsBought } = this.state;

    return (
      <Wrapper isOpen={ticketsBought}>
        { ticketsBought ? 'ticket bought!' : 'error' }
      </Wrapper>
    );
  }
}
 
export default Notification;
