import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import withReveal from "react-reveal/withReveal";

import {
  Card,
  CardSubtitle,
  CardTitle,
  Paragraph
} from "../components/DataCard";
import landingLogo from "../static/landing-logo.svg";
import team from "../data/team";
import { TeamMember, TeamMembersWrapper } from "./about";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faTelegram
} from "@fortawesome/free-brands-svg-icons";
import theme from "../theme";

const LandingImage = styled.img`
  @media screen and (min-width: 1921px) {
    width: 30em;
  }
  width: 20em;
  max-width: 100%;
  height: auto;
  shape-rendering: crispEdges;
  image-rendering: crisp-edges;
  justify-self: center;
`;
const SocialLogos = styled.div`
  display: flex;
  width: 240px;
  margin-top: 0.2rem;
  justify-content: space-between;
`;

const IconLink = styled(FontAwesomeIcon)`
  color: ${theme.primary};
  font-size: 1.5rem;
  &:hover {
    color: ${theme.primary.darken(0.3)};
  }
`;

const Tagline = styled.h2`
  font-family: Montserrat, serif;
  text-transform: uppercase;
  background-image: linear-gradient(20deg, #116266, #2db677);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  @media screen and (min-width: 1921px) {
    font-size: 2.7rem;
  }
 
  text-align:center;
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const SectionCard = styled(Card)`
  max-width: 840px;
`;

const LandingCard = styled(Card)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 60px);
  margin: 0;
`;

const Section = withReveal(
  styled.div`
    display: flex;
    min-height: 20vh;
    align-content: center;
    align-items: center;
    justify-content: center;
  `,
  <Fade />
);
const Seperator = styled.div`
  width: 90%;
  display: flex;
  margin: auto;
  border-bottom: 1px solid ${theme.secondary};
`;

export default () => (
  <React.Fragment>
    <Head>
      <title>Monti - Autonomous Financial Stack</title>
    </Head>

    <LandingCard>
      <Fade duration={5000}>
        <LandingImage src={landingLogo} />
        <Tagline>Autonomous Financial Stack</Tagline>
        <SocialLogos>
          <Link href="https://github.com/Monti">
            <a target="_blank">
              <IconLink icon={faGithub} />
            </a>
          </Link>
          <Link href="https://t.me/montichat">
            <a target="_blank">
              <IconLink icon={faTelegram} />
            </a>
          </Link>
          <Link href="https://twitter.com/MontiFinance">
            <a target="_blank">
              <IconLink icon={faTwitter} />
            </a>
          </Link>
        </SocialLogos>
      </Fade>
    </LandingCard>
    <Seperator />
    <Section>
      <Fade>
        <SectionCard>
          <CardTitle>About</CardTitle>
          <Paragraph>Tokenization is eating the world.</Paragraph>
          <Paragraph>
            Tokenized assets enable efficient trading, provable ownership, and
            uncensorable access to their underlying value. Adoption, however, is
            lacking due to the absence tools that enable to fully leverage the
            benefits of tokenization.
          </Paragraph>
          <Paragraph>
            Monti is building a decentralized liquidity platform to enable new
            types of interactions with tokenized assets. We are committed to
            providing solutions that connect idle crypto assets with value
            generating opportunities through an open intermediary layer.
          </Paragraph>
          <Paragraph>
            Land titles, company shares, and value not captured by the
            traditional finance are all being tokenized.
          </Paragraph>
          <Paragraph>We are ready.</Paragraph>
        </SectionCard>
      </Fade>
    </Section>
    <Seperator />
    <Section>
      <SectionCard>
        <CardTitle>Solutions</CardTitle>
        <Paragraph>We have already built two key solutions:</Paragraph>
        <br />
        <CardSubtitle>
          MontiExchange - Automated Algorithmic Market Making
        </CardSubtitle>
        <Paragraph indent>
          A DEX based on automated market making currently deployed on the
          VeChain mainnet. In addition to being the foundation for further Monti
          solutions it will serve to improve the UX and interopability of other
          dApps within the ecosystem.
        </Paragraph>
        <Paragraph indent>
          At the moment it's the only DEX available on Vechain providing instant
          trading and low fees attracting a sizable trading volume. Anyone can
          list new tokens on MontiExchange allowing to instantly scale to any
          newly deployed token.
        </Paragraph>
        <Paragraph indent>
          MontiExchange works by connecting idle holders of tokens with traders
          guaranteeing overall returns to the former and instant liquidity to
          the latter.
        </Paragraph>
        <br />
        <CardSubtitle>
          MontiMargin - Permisionless & Trustless Margin Trading
        </CardSubtitle>
        <Paragraph indent>
          An entirely on-chain margin trading solution currently deployed on the
          Ropsten testnet. It's a simple, low cost base layer that enables more
          advanced contstructs such as Anti-Tokens, Leveraged Index Tokens and
          more to be built on top of it by anyone.
        </Paragraph>
        <Paragraph indent>
          At launch MontiMargin will support all the tokens listed on Kyber, one
          of Ethereum's leading DEXs. When MontiExchange is launched on
          Ethereum's mainnet, MontiMargin will migrate to use it as well,
          enabling anyone to margin trade any ERC20 token.
        </Paragraph>
        <Paragraph indent>
          MontiMargin brings traders and lenders together, providing large
          liquidity pools for traders and removing counterparty risk for
          lenders.
        </Paragraph>
      </SectionCard>
    </Section>
    <Seperator />
    <Section>
      <SectionCard>
        <CardTitle>Who's behind Monti?</CardTitle>
        <TeamMembersWrapper>
          {team.map(member => (
            <TeamMember {...member} />
          ))}
        </TeamMembersWrapper>
      </SectionCard>
    </Section>
  </React.Fragment>
);
