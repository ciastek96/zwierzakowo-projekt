import React, { Component } from 'react';
import styled from 'styled-components';
import Input from 'components/Input/Input';
import Textarea from 'components/Textarea/Textarea';
import Button from 'components/Button/Button';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const StyledForm = styled.form`
  margin: 60px auto 25px;
  padding: 35px;
  max-width: 720px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`;

const StyledButton = styled(Button)``;

class newPostForm extends Component {
  state = {
    title: '',
    content: '',
    idUser: '',
    username: '',
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt.decode(token);
    this.setState({
      idUser: decoded.idUser,
      username: decoded.username,
    });
  }

  handleTitle = e => {
    this.setState({
      title: e.target.value,
    });
  };
  handleContent = e => {
    this.setState({
      content: e.target.value,
    });
  };

  addNewPost = e => {
    e.preventDefault();
    console.log(this.state);
    const { title, content, idUser, username } = this.state;

    // fetch(`http://localhost:4000/posts/add?title=${title}&content=${content}`)
    //   .then(response => response.json())
    //   .catch(err => console.error(err));

    axios
      .post('http://localhost:4000/posts/add', {
        idUser: idUser,
        username: username,
        title: title,
        content: content,
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <StyledForm onSubmit={this.addNewPost}>
        <Input placeholder="tytuł" type="text" name="title" required onChange={this.handleTitle} />
        <Textarea placeholder="opis" name="description" required onChange={this.handleContent} />
        <Input placeholder="zdjęcie" name="image" type="file" />
        <StyledButton type="submit">Dodaj</StyledButton>
      </StyledForm>
    );
  }
}

export default newPostForm;
