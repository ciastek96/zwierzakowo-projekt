import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import UserPageTemplate from 'templates/UserPageTemplate';
import Heading from 'components/Heading/Heading';
import Paragraph from 'components/Paragraph/Paragraph';
import Button from 'components/Button/Button';
import BackArrowIcon from 'assets/icons/link.svg';

const StyledWrapper = styled.div`
  margin: 60px 100px;
  max-width: 550px;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  margin: 0 0 0 100px;
`;

const StyledHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin-bottom: 0;
`;

const StyledParagraph = styled(Paragraph)`
  line-height: 1.7;
  margin: 15px 0;
`;

const ArticleView = ({ match, id, title, author, created, content }) => (
  <UserPageTemplate>
    <NavLink to="/">
      <StyledButton round />
    </NavLink>
    <StyledWrapper>
      <StyledHeading>Sonia</StyledHeading>
      <StyledParagraph>
        Sadipscing takimata invidunt at takimata ipsum, ipsum vero erat takimata takimata takimata
        ipsum dolore est accusam, et lorem gubergren ipsum amet ea, diam amet ipsum at justo lorem
        at lorem, gubergren aliquyam amet dolores lorem gubergren voluptua ea labore amet, aliquyam
        sit gubergren sit lorem et. Takimata et ea ipsum takimata sanctus gubergren. Diam vero erat
        sit et et. Kasd duo sea takimata et ut diam. Sed clita duo erat rebum. Ipsum vero nonumy sit
        no voluptua takimata rebum elitr..
      </StyledParagraph>
    </StyledWrapper>
  </UserPageTemplate>
);

export default ArticleView;
