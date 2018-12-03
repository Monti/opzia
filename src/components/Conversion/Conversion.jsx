import React, { Component, Fragment } from "react";
import styled from "styled-components";
import TextInput from "../TextInput";
import Button from "../Button";

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const Wrapper = styled.div`
  /* text-align: center; */
`;

const Styledlabel = styled.div`
  color: #ddd;
  font-size: 0.9em;
  margin-top: 20px;
  margin-bottom: 10px;
`;

class Conversion extends Component {
  constructor(props) {
    super(props);
  }

  changeFromAmount(e) {
    const fromAmount = e.target.value;
    this.setState({ fromAmount });
  }

  render() {
    const {
      fromToken,
      toToken,
      onSwap,
      onLock,
      toAmount,
      
      fromAmount,
      onInputChange,
    } = this.props;

    return (
      <Wrapper>
        <Styledlabel>from</Styledlabel>
        <TextInput
          value={fromAmount}
          onChange={(e)=>onInputChange("fromAmount", e.target.value)}
          addon={fromToken}
        />
        <Styledlabel>to</Styledlabel>
        <TextInput disabled  value={toAmount} addon={toToken} />
        <Footer>
          <Button onClick={() => onSwap()}>Swap</Button>
          <Button onClick={() => onLock()} secondary>
            Lock in this rate
          </Button>
        </Footer>
      </Wrapper>
    );
  }
}

export default Conversion;
