import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const ListItem = styled.li`
  font-size: ${({ theme }) => theme.fontSize.s};
  list-style: none;
  text-align: center;
  padding: 15px 0;
  text-transform: uppercase;
  letter-spacing: 0.9px;
`;

const List = styled.ul``;

const StyledLink = styled(NavLink)`
  font-weight: 400;
  color: white;
  text-decoration: none;

  &.active {
    font-weight: 700;
  }
`;
class Navigation extends Component {
  state = {
    isUserLogged: false,
  };

  componentDidMount() {
    if (localStorage.getItem('usertoken')) {
      this.setState({
        isUserLogged: true,
      });
    }
  }
  render() {
    return (
      <List>
        <ListItem>
          <StyledLink to="/posts" activeclass="active">
            Posty
          </StyledLink>
        </ListItem>
        {this.state.isUserLogged ? (
          <ListItem>
            <StyledLink to="/yourposts" activeclass="active">
              Twoje posty
            </StyledLink>
          </ListItem>
        ) : null}
        <ListItem>
          <StyledLink to="/rank" activeclass="active">
            Ranking
          </StyledLink>
        </ListItem>
        {this.state.isUserLogged ? (
          <>
            <ListItem>
              <StyledLink to="/settings" activeclass="active">
                Konto
              </StyledLink>
            </ListItem>
            <ListItem>
              <StyledLink to="/logout" activeclass="active">
                Wylogowanie
              </StyledLink>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <StyledLink to="/login" activeclass="active">
                Logowanie
              </StyledLink>
            </ListItem>
            <ListItem>
              <StyledLink to="/register" activeclass="active">
                Rejestracja
              </StyledLink>
            </ListItem>
          </>
        )}
      </List>
    );
  }
}

export default Navigation;
