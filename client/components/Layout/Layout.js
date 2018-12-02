import React, { Component } from "react";
import NavBar from "../Navbar/Navbar";
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    min-width: 100%;
    background-size: 100%;
    background: white;/*linear-gradient(20deg, #116266, #2db677) no-repeat 0;*/
    font-family: Montserrat, serif; 
  }
`;

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <NavBar />
        {this.props.children}
      </React.Fragment>
    );
  }
}
