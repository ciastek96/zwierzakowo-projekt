import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Heading from 'components/Heading/Heading';
import Paragraph from 'components/Paragraph/Paragraph';
import Button from 'components/Button/Button';

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
const Article = ({ title, content }) => (
  <>
    <NavLink to="/">
      <StyledButton round />
    </NavLink>
    <StyledWrapper>
      <StyledHeading>{title}</StyledHeading>
      <StyledParagraph>{content}</StyledParagraph>
    </StyledWrapper>
  </>
);

export default Article;
