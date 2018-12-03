import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin: 1px;
  width: 100%;
`;

const StyledTextInput = styled.input`
  background-color: #F5F6F8;
  border: none;
  height: 57px;
  font-size: 0.9em;
  padding: 12px;
  width: 100%;
  text-align: right;
`;

const Addon = styled.label`
  align-items: center;
  background: #1fa888;
  color: #fff;
  display: flex;
  font-family: 'Rubik';
  font-size: 0.8em;
  font-weight: 700;
  justify-content: center;
  margin-left: 2px;
  text-transform: lowercase;
  width: 70px;
`;

const StyledLabel = styled.label`
  width: 100%;
`;

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const { noAddon, addon, disabled, value, onChange, placeholder } = this.props;
    const addonLabel = addon ? addon.symbol : '?';

    return (
      <Wrapper>
        <StyledTextInput
          disabled={disabled}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder} />
        { !noAddon &&
          <Addon>{ addonLabel }</Addon>
        }
      </Wrapper>
    );
  }
}
 
export default TextInput;
