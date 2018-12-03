import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 100%;
`;

const StyledTextInput = styled.input`
  background-color: #F5F6F8;
  border: none;
  padding: 16px;
  width: 100%;
  text-align: right;
`;

const StyledLabel = styled.label`
  align-items: center;
  background: #1fa888;
  color: #fff;
  display: flex;
  font-family: 'Rubik';
  font-size: 0.8em;
  font-weight: 700;
  justify-content: center;
  margin-left: 2px;
  width: 70px;
`;

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const { addon } = this.props;
    const label = addon ? addon.symbol : '?';

    return (
      <Wrapper>
        <StyledTextInput type="text" value="33.02938" placeholder="Amount" />
        <StyledLabel>{ label }</StyledLabel>
      </Wrapper>
    );
  }
}
 
export default TextInput;
