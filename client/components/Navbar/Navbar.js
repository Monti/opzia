import React from "react";
import styled from "styled-components";
import theme from "../../theme";
import ActiveLink from "../../components/ActiveLink";

const StyledLink = styled.li`
  display: flex;
  justify-content: center;
  align-items: stretch;
  text-transform: uppercase;

  &:hover {
    background: rgba(115, 134, 148, 0.3) !important;
  }

  a {
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    font-weight: 600;
    font-size: 1.2em;
    font-family: Montserrat, serif;
    color: ${theme.primary};
    text-decoration: none !important;

    @media screen and (max-width: 350px) {
      padding: 0 .8rem;
    }
    
    &:hover {
      color: ${theme.primary.darken(0.2)};
      text-decoration: none;
    }

    &.active {
      border-bottom: 4px solid rgb(45, 182, 119);
    }
  }
`;

const NavbarLink = props => (
  <StyledLink>
    <ActiveLink {...props}>
      <a target={props.newTab? "_blank" : ""}>
        {/*<StyledA>*/}
        {props.children}
        {/*</StyledA>*/}
      </a>
    </ActiveLink>
  </StyledLink>
);

const NavbarContainer = styled.div`
  height: 60px;
  background-color: white;
  width: 100%;
  position: sticky;
  top: 0;
  border-bottom: 1px solid whitesmoke;
  z-index: 99;
`;

const NavBarContent = styled.ul`
  display: flex;
  list-style: none;
  align-items: stretch;
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
`;

const NavBar = () => (
  <NavbarContainer>
    <NavBarContent>
      <NavbarLink href="/">
        Opzia
      </NavbarLink>
     
    </NavBarContent>
  </NavbarContainer>
);

export default NavBar;
