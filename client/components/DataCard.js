import React from "react";
import { Box, Flex } from "@rebass/grid/dist/index";
import styled from "styled-components";
import theme from "../theme"

export const Card = styled.div`
  background: #fff;
  width: 100%;
  padding: 2rem;
  margin: 2rem 0;
`;

export const CardTitle = styled.h3`
  color: ${theme.primary};
  font-weight:bold;
  text-transform: uppercase;
  margin: 0 0 1.5rem 0;
  font-size: 1.4em;
`;

export const CardSubtitle = styled.h4`
  color: ${theme.subprime};
  font-size: 1.2em;
  font-weight:bold;
  letter-spacing: 1px;
  //margin: 1.5em 0 1em 0;
`;

export const Container = styled.div`
  width: 840px;
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

export const BreakableFlex = styled(Flex)`
  flex-wrap: wrap;
  margin-top: 1rem;
`;

export const BreakableBox = props => (
  <Box width={[1, 0.5]} pr={[0, "1rem"]} mt={["2rem", 0]} {...props}>
    {props.children}
  </Box>
);

export const Paragraph = styled.p`
  font-size: 1.1rem;
  margin: ${props=> props.indent? "1rem 0rem 1rem 2rem" : "1rem 0"};
  line-height:1.5;
  &:last-child {
    margin-bottom: 0;
  }
  &:first-child {
    margin-top: 0;
  }
`;
