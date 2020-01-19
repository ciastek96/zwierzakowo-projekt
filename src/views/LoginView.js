import React from 'react';
import UserPageTemplate from '../templates/UserPageTemplate';
import LoginForm from 'components/LoginForm/LoginForm';

const LoginView = () => (
  <UserPageTemplate header="Logowanie">
    <LoginForm formType="login" />
  </UserPageTemplate>
);

export default LoginView;
