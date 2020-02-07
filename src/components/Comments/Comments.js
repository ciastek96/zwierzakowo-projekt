import React, { Component } from 'react';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Button from 'components/Button/Button';
import Textarea from 'components/Textarea/Textarea';

// const Comm = [
//   {
//     idComment: 1,
//     content: 'Super zdjęcie!',
//     author: 'Kamil',
//   },
//   {
//     idComment: 2,
//     content:
//       'Super zdjęcieInvidunt diam sed sea est kasd, no sanctus magna sanctus dolor eirmod kasd sit ipsum no. Et vero nonumy lorem.!',
//     author: 'Ala',
//   },
//   {
//     idComment: 3,
//     content: 'SSuperr!',
//     author: 'Kamila',
//   },
// ];

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
  padding-bottom: 20px;
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
`;
const Heading = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 600;
`;

class Comments extends Component {
  state = {
    comm: null,
    username: '',
    idUser: '',
    content: '',
    idPost: '',
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt.decode(token);
    this.getComments();
    this.setState({
      idUser: decoded.idUser,
      username: decoded.username,
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
      console.log(comm.data);
      return (
        <StyledWrapper>
          <StyledList>
            {comm.data.map(item => (
              <StyledListItem>
                <StyledAvatar></StyledAvatar>
                <StyledInnerWrapper>
                  <Heading>
                    {item.idUser} / {item.data}
                  </Heading>
                  <Content>{item.content}</Content>
                </StyledInnerWrapper>
              </StyledListItem>
            ))}
          </StyledList>
          <StyledForm onSubmit={this.addNewComment}>
            <StyledTextarea onChange={this.handleContent}></StyledTextarea>
            <StyledButton>Skomentuj</StyledButton>
          </StyledForm>
        </StyledWrapper>
      );
    } else {
      return null;
    }
  }
}

export default Comments;
