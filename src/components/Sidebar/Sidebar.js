import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../Nagivation/Navigation';
import Button from '../Button/Button';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
`;

const StyledLogo = styled.a`
  margin: 20px 0 200px;
  font-weight: 800;
  text-transform: uppercase;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.white};
`;

const StyledNavLink = styled(NavLink)`
  margin-top: auto;
  text-decoration: none;
  color: ${({ theme }) => theme.white};
`;

class Sidebar extends Component {
  state = {
    isButtonHidden: true,
  };

  componentDidMount() {
    if (localStorage.getItem('usertoken')) {
      this.setState({
        isButtonHidden: false,
      });
    }
  }

  render() {
    const { isButtonHidden } = this.state;

    return (
      <StyledWrapper>
        <StyledLogo as={NavLink} to="/">
          <p>Zwierzakowo</p>
        </StyledLogo>
        <Navigation />
        <StyledNavLink to="/newpost">
          <Button hidden={isButtonHidden} white>
            Dodaj
          </Button>
        </StyledNavLink>
      </StyledWrapper>
    );
  }
}

export default Sidebar;
