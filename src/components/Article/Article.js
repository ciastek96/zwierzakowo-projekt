import React from 'react';
import styled, { css } from 'styled-components';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import Paragraph from '../Paragraph/Paragraph';

const StyledWrapper = styled.div`
  min-height: 380px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 30px -10px hsla(0, 0%, 0%, 0.1);
  display: grid;
  grid-template-rows: 0.25fr 1fr;
  color: ${({ theme }) => theme.white};
`;

const InnerWrapper = styled.div`
  padding: 17px 30px;
  position: relative;
  background-color: ${({ theme, flex }) => (flex ? theme.white : theme.primary)};
  ${({ flex }) =>
    flex &&
    css`
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `};

  :first-of-type {
    z-index: 999;
  }
`;

const DateInfo = styled.p`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin: 0 0 5px;
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0;
`;

/*
const StyledAvatar = styled.img`
  height: 86px;
  width: 86px;
  border: 5px solid ${({ theme }) => theme.primary};
  position: absolute;
  right: 25px;
  top: 25px;
  border-radius: 50%;
  background-position: 50% 50%;
  background-size: 60%;
`;
*/

const Card = ({ cardType }) => (
  <StyledWrapper>
    <InnerWrapper>
      <StyledHeading>Title</StyledHeading>
      <DateInfo>3 days</DateInfo>
    </InnerWrapper>
    <InnerWrapper flex>
      <Paragraph>
        Elitr vero ipsum erat at sea clita, sea est et clita stet no invidunt no consetetur lorem.
        Sed dolores gubergren stet et invidunt accusam justo duo. Eos ipsum diam sit vero dolore. Et
        ea gubergren diam diam est, labore tempor lorem sadipscing justo aliquyam sea.
      </Paragraph>
      <Button small>remove</Button>
    </InnerWrapper>
  </StyledWrapper>
);

export default Card;
