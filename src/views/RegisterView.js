import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserPageTemplate from 'templates/UserPageTemplate';
import RegisterForm from 'components/RegisterForm/RegisterForm';

class RegisterView extends Component {
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
        <RegisterForm formType="register" />
        {this.state.redirect && <Redirect to="/posts" />}
      </UserPageTemplate>
    );
  }
}

export default RegisterView;
