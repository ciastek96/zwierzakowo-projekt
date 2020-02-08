import React from 'react';
import styled, { css } from 'styled-components';
import { Redirect } from 'react-router-dom';
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
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin: 5px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0;
`;

const StyledParagraph = styled(Paragraph)`
  line-height: 1.4;
  font-size: ${({ theme }) => theme.fontSize.s};
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

class Article extends React.Component {
  state = {
    redirect: false,
  };

  handleArticleClick = () => this.setState({ redirect: true });

  render() {
    const { id, title, created, author, content } = this.props;

    if (this.state.redirect) {
      return <Redirect to={`posts/${id}`} />;
    }

    return (
      <StyledWrapper onClick={this.handleArticleClick}>
        <InnerWrapper>
          <StyledHeading>{title}</StyledHeading>
          <DateInfo>
            Upublikowano {created} przez {author}
          </DateInfo>
        </InnerWrapper>
        <InnerWrapper flex>
          <StyledParagraph>
            {content.length > 230 ? content.substr(0, 230) + '...' : content}
          </StyledParagraph>
          <Button small>Czytaj</Button>
        </InnerWrapper>
      </StyledWrapper>
    );
  }
}

export default Article;
