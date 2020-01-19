import React from 'react';
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

const Navigation = () => (
  <List>
    <ListItem>
      <StyledLink to="/posts" activeclass="active">
        Posty
      </StyledLink>
    </ListItem>
    <ListItem>
      <StyledLink to="/yourposts" activeclass="active">
        Twoje posty
      </StyledLink>
    </ListItem>
    <ListItem>
      <StyledLink to="/rank" activeclass="active">
        Ranking
      </StyledLink>
    </ListItem>
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
  </List>
);

export default Navigation;