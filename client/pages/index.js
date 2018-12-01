import React, { Component } from "react";
import Link from "next/link";
import Web3Container from "../lib/Web3Container";
import styled from "styled-components";
import PageWrapper from "../components/CommonComponents/PageWrapper";
import { Suggest } from "@blueprintjs/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { MenuItem } from "@blueprintjs/core";

const testTokens = [
  { symbol: "test", price: 555, decimals: 18 },
  { symbol: "mock", price: 18, decimals: 18 }
];

const Container = styled.div`
  display: flex;
  width: 840px;
  min-height: 640px;
  border: 1px solid whitesmoke;
  align-self: center;
  text-align: center;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Item = styled.div`

  width: 30%;
`;

const Swap = class SignUpForm extends Component {
  constructor(props) {
    super(props);
  }
  renderInput(item) {
    return item.symbol;
  }

  renderItem(item) {
    return <MenuItem label={item.symbol} />;
  }

  render() {
    return (
      <PageWrapper>
        <Container>
          <Row>
            <Item>
              <Suggest
                items={testTokens}
                inputValueRenderer={this.renderInput}
                itemRenderer={this.renderItem}
              />
            </Item>
            <Item>
              <FontAwesomeIcon icon={faArrowRight} />
            </Item>
            <Item>
              <Suggest
                items={testTokens}
                inputValueRenderer={this.renderInput}
                itemRenderer={this.renderItem}
              />
            </Item>
          </Row>
        </Container>
      </PageWrapper>
    );
  }
};

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Swap Page...</div>}
    render={({ accounts }) => <Swap accounts={accounts} />}
  />
);
