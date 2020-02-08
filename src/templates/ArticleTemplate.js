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
        console.log('ok');
      })
      .catch(err => console.error(err));
  };

  render() {
    const { title, content } = this.props;
    return (
      <>
        <NavLink to="/">
          <StyledButton round />
        </NavLink>
        <StyledWrapper>
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
          <StyledHeading>{title}</StyledHeading>
          <StyledParagraph>{content}</StyledParagraph>
        </StyledWrapper>
      </>
    );
  }
}

export default ArticleTemplate;
