import React, { Component } from 'react';
import styled from 'styled-components';
import Sidebar from 'components/Sidebar/Sidebar';
import Heading from 'components/Heading/Heading';

const StyledWrapper = styled.div`
  margin-left: 250px;
  transition: all 1s linear;
`;

const StyledHeader = styled.div`
  padding: 35px;
`;

const StyledHeading = styled(Heading)`
  margin-top: 25px;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const StyledGridWrapper = styled.div`
  padding: 10px 50px 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 45px;
`;

const StyledInnerWrapper = styled.div``;

class UserPageTemplate extends Component {
  state = {};

  // getFilteredUsersForText(text) {
  //   return allUsers.filter(user => user.toLowerCase().includes(text.toLowerCase()));
  // }

  render() {
    const { header, children, pageType } = this.props;
    return (
      <>
        <Sidebar />
        <StyledWrapper>
          <StyledHeader>
            {/* {pageType === 'posts' && <Input search placeholder="szukaj" />} */}
            <StyledHeading>{header}</StyledHeading>
          </StyledHeader>
          {pageType === 'posts' ? (
            <StyledGridWrapper>{children}</StyledGridWrapper>
          ) : (
            <StyledInnerWrapper>{children}</StyledInnerWrapper>
          )}
        </StyledWrapper>
      </>
    );
  }
}

export default UserPageTemplate;
