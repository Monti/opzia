import React, { Component } from 'react';

import Trade from '../components/Trade';
import Container from '../components/Container';

class Home extends Component {
  render() {
    return (
      <Container>
        <Trade />
      </Container>
    )
  }
}
 
export default Home;
