import React, { Component } from 'react';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Button from 'components/Button/Button';
import Textarea from 'components/Textarea/Textarea';
// import Modal from 'components/Modal/Modal';

const StyledWrapper = styled.div`
  margin: 80px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 1px 30px -10px hsla(0, 0%, 0%, 0.1);
`;

const StyledList = styled.ul``;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 5px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding: 10px 0;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
`;
const StyledAvatar = styled.div`
  min-height: 80px;
  min-width: 80px;
  margin: 10px;
  background: ${({ theme }) => theme.grey100};
  border-radius: 50%;
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 5px;
`;
const StyledTextarea = styled(Textarea)`
  height: 100px;
  width: 80%;
  margin-right: 25px;
`;

const StyledButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;
const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  width: 100%;
  text-align: left;
`;
const Heading = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const User = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 600;
  margin-right: 10px;
`;

const Data = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

// const Err = styled.p``;

class Comments extends Component {
  state = {
    comm: null,
    username: '',
    idUser: '',
    content: '',
    idPost: '',
    err: '',
  };

  componentDidMount() {
    if (localStorage.getItem('usertoken')) {
      const token = localStorage.usertoken;
      const decoded = jwt.decode(token);
      this.setState({
        idUser: decoded.idUser,
        username: decoded.username,
      });
    }
    this.getComments();
    this.setState({
      idPost: this.props.idPost,
      content: this.props.content,
    });
  }

  getComments() {
    axios
      .get(`http://localhost:4000/comments/${this.props.idPost}`)
      .then(res =>
        this.setState({
          comm: res.data,
        }),
      )
      .catch(err => console.error(err));
  }

  addNewComment = e => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/comments/add', {
        idUser: this.state.idUser,
        username: this.state.username,
        content: this.state.content,
        idPost: this.state.idPost,
      })
      .then(res => {
        this.getComments();
      })
      .catch(err => console.error(err));
  };

  handleContent = e => {
    this.setState({
      content: e.target.value,
    });
  };
  render() {
    const { comm } = this.state;
    if (comm !== null) {
      return (
        <>
          <StyledWrapper>
            <StyledList>
              {comm.data.map(item => (
                <StyledListItem key={item.idComment}>
                  <StyledAvatar></StyledAvatar>
                  <StyledInnerWrapper>
                    <Heading>
                      <User>{item.idUser}</User>
                      <Data>{item.data.substr(0, 10)}</Data>
                    </Heading>
                    <Content>{item.content}</Content>
                  </StyledInnerWrapper>
                </StyledListItem>
              ))}
            </StyledList>
            {this.state.idUser !== '' ? (
              <StyledForm onSubmit={this.addNewComment} autoComplete="off">
                <StyledTextarea required onChange={this.handleContent}></StyledTextarea>
                <StyledButton type="submit">Skomentuj</StyledButton>
              </StyledForm>
            ) : null}
          </StyledWrapper>
        </>
      );
    } else {
      return null;
    }
  }
}

export default Comments;
