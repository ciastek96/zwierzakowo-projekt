import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Heading from 'components/Heading/Heading';
import Paragraph from 'components/Paragraph/Paragraph';
import Button from 'components/Button/Button';
import StarRatings from 'react-star-ratings';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const StyledWrapper = styled.div`
  margin: 20px 100px 60px;
  max-width: 780px;
  display: flex;
  flex-direction: column;
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin: 0 0 0 100px;
`;

const StyledHeading = styled(Heading)``;

const StyledParagraph = styled(Paragraph)`
  line-height: 1.7;
  margin: 15px 0;
`;

const StyledTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin: 25px 0 0 0;
`;
const StyledDateInfo = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 600;
  color: ${({ theme }) => theme.grey300};
  margin: 8px 8px 8px 0;

  span {
    transition: color 0.25s ease-in-out;
  }

  span:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
  }
`;

const StyledTags = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.grey300};
  font-weight: 600;
  display: flex;
  margin: 5px 0 15px 0;
  padding: 0 10px;
`;

const StyledTagsItem = styled.a`
  margin: 0 2px;
  text-transform: lowercase;
  transition: color 0.15s ease-in-out;

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
  }
`;

class ArticleTemplate extends Component {
  state = {
    idPost: this.props.idPost.id,
    idUser: '',
    rating: 0,
  };

  componentDidMount() {
    if (localStorage.getItem('usertoken')) {
      const token = localStorage.usertoken;
      const decoded = jwt.decode(token);
      this.setState({
        idUser: decoded.idUser,
      });
    }
    axios
      .post('http://localhost:4000/rates', {
        idPost: this.props.idPost.id,
      })
      .then(res => {
        if (res.data.data[0].avg !== null) {
          this.setState({
            rating: res.data.data[0].avg,
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  changeRating = newRating => {
    this.setState({
      rating: newRating,
    });
    axios
      .post('http://localhost:4000/rates/add', {
        idPost: this.state.idPost,
        idUser: this.state.idUser,
        rate: newRating,
      })
      .then(res => {
        console.log('Dziękujemy za ocene!');
      })
      .catch(err => console.error(err));
  };

  render() {
    const { title, content, created, username, sex, type, breed, pedigreed } = this.props;
    return (
      <>
        <NavLink to="/">
          <StyledButton round />
        </NavLink>
        <StyledWrapper>
          <StyledInnerWrapper>
            <StyledDateInfo>
              Opublikowano {created.substr(0, 10)} przez <span>{username}</span>
            </StyledDateInfo>
            <StarRatings
              rating={this.state.rating}
              starRatedColor="rgb(27, 172, 162)"
              starEmptyColor="rgb(209,209, 209)"
              starHoverColor="rgb(27, 172, 162)"
              changeRating={this.changeRating}
              starDimension="25px"
              starSpacing="2px"
              numberOfStars={5}
              name="rating"
            />
          </StyledInnerWrapper>
          <StyledHeading>
            <StyledTags>
              {sex && <StyledTagsItem>#{sex}</StyledTagsItem>}
              {type && <StyledTagsItem>#{type}</StyledTagsItem>}
              {breed && <StyledTagsItem>#{breed}</StyledTagsItem>}
              <StyledTagsItem>#{pedigreed ? 'z_rodowodem' : 'bez_rodowodu'}</StyledTagsItem>
            </StyledTags>
            <StyledTitle>{title}</StyledTitle>
          </StyledHeading>
          <StyledParagraph>{content}</StyledParagraph>
        </StyledWrapper>
      </>
    );
  }
}

export default ArticleTemplate;
