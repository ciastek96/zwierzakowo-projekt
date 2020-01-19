import React from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import LoginForm from 'components/LoginForm/LoginForm';

const RegisterView = () => (
  <UserPageTemplate header="Rejestracja">
    <LoginForm formType="register" />
  </UserPageTemplate>
);

export default RegisterView;
