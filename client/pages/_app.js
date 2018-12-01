import React from "react";
import App, { Container } from "next/app";
import Layout from "../components/Layout/Layout";
import { ThemeProvider } from "styled-components";
import { colors } from "../theme";
import { withRouter } from "next/router";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={colors}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRouter(MyApp);
