import React, { Component } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Button from 'components/Button/Button';

const StyledForm = styled(Form)`
  margin: 60px auto 25px;
  padding: 35px;
  max-width: 720px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`;

const StyledField = styled(Field)`
  padding: 15px 30px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.grey100};
  border: none;
  border-radius: 50px;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.grey300};
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding-left: 20px;
`;

const StyledMessage = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding-left: 20px;
`;

const StyledButton = styled(Button)`
  width: 150px;
`;

class RegisterForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    message: '',
  };

  registerNewUser = newUser => {
    axios
      .post('users/register', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
      .then(res => {
        if (res.data.error) {
          this.setState({
            message: res.data.error,
          });
        }
      });
  };

  render() {
    const { message } = this.state;
    return (
      <Formik
        initialValues={{ username: '', email: '', password: '', password2: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Pole nie może być puste.';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Podano nieprawidłowy adres e-mail.';
          } else {
            this.setState({
              email: values.email,
            });
          }
          if (!values.username) {
            errors.username = 'Pole nie może być puste!';
          } else if (!/^[a-z0-9_-]{4,16}$/gim.test(values.username)) {
            errors.username =
              'Login musi zawierać 4-16 znaki i nie może zawierać znaków specjalnych.';
          } else {
            this.setState({
              username: values.username,
            });
          }
          if (!values.password) {
            errors.password = 'Pole nie może być puste.';
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{4,32}$/g.test(values.password)
          ) {
            errors.password = 'Hasło powinno zawierać małe litery, duże litery, cyfrę i znak.';
          } else {
            this.setState({
              password: values.password,
            });
          }
          if (!values.password2) {
            errors.password2 = 'Pole nie może być puste.';
          } else if (values.password !== values.password2) {
            errors.password2 = 'Podane hasła nie są identyczne.';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            this.registerNewUser();
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm autoComplete="new-password">
            <StyledField
              type="text"
              name="username"
              placeholder="username"
              required
              autoComplete="off"
            />
            <StyledErrorMessage name="username" component="div" />
            {message ? <StyledMessage>{message}</StyledMessage> : null}
            <StyledField type="email" name="email" placeholder="email" required />
            <StyledErrorMessage name="email" component="div" />

            <StyledField type="password" name="password" placeholder="password" required />
            <StyledErrorMessage name="password" component="div" />

            <StyledField type="password" name="password2" placeholder="password" required />
            <StyledErrorMessage name="password2" component="div" />

            <StyledButton type="submit" disabled={isSubmitting}>
              Zarejestruj
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    );
  }
}

export default RegisterForm;
