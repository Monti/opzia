import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import TextInput from '../TextInput';
import Button from '../Button';

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
    this.state = {  }
  }
  render() { 
    const { from, to } = this.props;

    return (
      <Wrapper>
        <Styledlabel>from</Styledlabel>
        <TextInput addon={from} />
        <Styledlabel>to</Styledlabel>
        <TextInput addon={to} />
        <Footer>
          <Button>Swap</Button>
          <Button secondary>Lock in this rate</Button>
        </Footer>
      </Wrapper>
    );
  }
}
 
export default Conversion;
