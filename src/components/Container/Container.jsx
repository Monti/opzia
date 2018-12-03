import React, { Component } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin: 0 auto;
  max-width: 640px;
  width: 100%;
`;

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <StyledContainer>
        { this.props.children }
      </StyledContainer>
    );
  }
}
 
export default Container;