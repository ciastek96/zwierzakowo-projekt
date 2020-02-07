import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

const StyledForm = styled.form`
  margin: 60px auto 25px;
  padding: 35px;
  max-width: 720px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`;

const StyledButton = styled(Button)``;

const StyledErrorMessage = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding-left: 20px;
`;

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    message: '',
  };

  handleUsername = e => {
    this.setState({
      username: e.target.value,
    });
  };
  handlePassword = e => {
    this.setState({
      password: e.target.value,
    });
  };

  redirectFn = () => {
    const { history } = this.props;
    history.push('/');
  };

  signInFn = e => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/users/login', {
        username: this.state.username,
        password: this.state.password,
      })
      .then(res => {
        this.setState({
          message: '',
        });
        localStorage.setItem('usertoken', res.data);
        return res.data;
      })
      .catch(err => {
        if (err.response.data) {
          this.setState({
            message: err.response.data,
          });
        }
      });
  };
  render() {
    const { message } = this.state;
    return (
      <StyledForm onSubmit={this.signInFn} method="POST">
        <Input placeholder="login" type="text" required onChange={this.handleUsername} />
        {message.usererr ? <StyledErrorMessage>{message.usererr}</StyledErrorMessage> : null}
        <Input placeholder="hasło" type="password" required onChange={this.handlePassword} />
        {message.passerr ? <StyledErrorMessage>{message.passerr}</StyledErrorMessage> : null}
        <StyledButton type="submit">Zaloguj</StyledButton>
      </StyledForm>
    );
  }
}

export default LoginForm;
