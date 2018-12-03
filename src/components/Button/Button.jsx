import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  background: #1fa888;
  color: #fff;
  border: none;
  font-size: 0.9em;
  padding: 12px 24px;

  ${({ secondary }) => secondary && css`
    background-color: #F5F6F8;
    color: initial;
  `}
`;

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    const { secondary } = this.props;

    return  (
      <StyledButton onClick={this.handleClick} secondary={secondary}>
        { this.props.children }
      </StyledButton>
    );
  }
}
 
export default Button;
