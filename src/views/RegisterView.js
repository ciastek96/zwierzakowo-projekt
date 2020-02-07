import React from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import RegisterForm from 'components/RegisterForm/RegisterForm';

const RegisterView = () => (
  <UserPageTemplate header="Rejestracja">
    <RegisterForm formType="register" />
  </UserPageTemplate>
);

export default RegisterView;
