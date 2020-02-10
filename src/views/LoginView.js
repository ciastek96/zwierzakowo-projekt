import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserPageTemplate from '../templates/UserPageTemplate';
import LoginForm from 'components/LoginForm/LoginForm';

class LoginView extends Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    if (localStorage.getItem('usertoken')) {
      this.setState({
        redirect: true,
      });
    }
  }
  render() {
    return (
      <UserPageTemplate header="Logowanie">
        <LoginForm formType="login" />
        {this.state.redirect && <Redirect to="/posts" />}
      </UserPageTemplate>
    );
  }
}

export default LoginView;
