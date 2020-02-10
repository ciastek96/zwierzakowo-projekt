import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { Formik, Form } from 'formik';

const StyledForm = styled(Form)`
  margin: 0 auto 25px;
  padding: 35px;
  max-width: 720px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`;

const StyledErrorMessage = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding-left: 20px;
`;

const Success = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding-left: 20px;
`;

class PasswordForm extends Component {
  state = {
    idUser: '',
    username: '',
    password: '',
    newPassword: '',
    newPassword2: '',
    success: '',
    passerr: '',
  };

  updatePassword = () => {
    axios
      .post('http://localhost:4000/password', {
        idUser: this.state.idUser,
        password: this.state.password,
        newPassword: this.state.newPassword,
      })
      .then(res => {
        this.setState({
          password: '',
          newPassword: '',
          newPassword2: '',
          passerr: res.data.passerr,
          success: res.data.success,
        });
      })
      .catch(err => console.error(err));
  };

  componentDidMount() {
    if (localStorage.getItem('usertoken')) {
      const token = localStorage.usertoken;
      const decoded = jwt.decode(token);
      this.setState({
        idUser: decoded.idUser,
        username: decoded.username,
        password: decoded.password,
      });
    }
  }

  render() {
    return (
      <Formik
        initialValues={{ password: '', newPassword: '', newPassword2: '' }}
        validate={values => {
          const errors = {};
          if (!values.password) {
            errors.password = 'Pole nie może być puste.';
          } else {
            this.setState({
              password: values.password,
            });
          }
          if (!values.newPassword) {
            errors.newPassword = 'Pole nie może być puste.';
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{4,32}$/g.test(values.newPassword)
          ) {
            errors.newPassword = 'Hasło powinno zawierać małe litery, duże litery, cyfrę i znak.';
          } else {
            this.setState({
              newPassword: values.newPassword,
            });
          }
          if (!values.newPassword2) {
            errors.newPassword2 = 'Pole nie może być puste.';
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{4,32}$/g.test(
              values.newPassword2,
            )
          ) {
            errors.newPassword2 = 'Hasło powinno zawierać małe litery, duże litery, cyfrę i znak.';
          } else {
            this.setState({
              newPassword2: values.newPassword2,
            });
          }
          if (values.newPassword !== values.newPassword2) {
            errors.newPassword2 = 'Hasła nie są identyczne';
          }
          //
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            this.updatePassword();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <StyledForm onSubmit={handleSubmit}>
            <h1>Zmień hasło</h1>
            {this.state.success && <Success>{this.state.success}</Success>}
            <Input
              type="password"
              name="password"
              placeholder="Aktualne hasło"
              onChange={handleChange}
              onBlur={handleBlur}
              value={this.state.email}
            />
            {this.state.passerr && <StyledErrorMessage>{this.state.passerr}</StyledErrorMessage>}
            <StyledErrorMessage>
              {errors.password && touched.password && errors.password}
            </StyledErrorMessage>

            {/* <label htmlFor="name">Imie</label> */}
            <Input
              type="password"
              name="newPassword"
              placeholder="Nowe hasło"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <StyledErrorMessage>
              {errors.newPassword && touched.newPassword && errors.newPassword}
            </StyledErrorMessage>

            {/* <label htmlFor="surname">Nazwisko</label> */}
            <Input
              type="password"
              name="newPassword2"
              placeholder="Powtórz hasło"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.surname}
            />
            <StyledErrorMessage>
              {errors.newPassword2 && touched.newPassword2 && errors.newPassword2}
            </StyledErrorMessage>
            <Button type="submit" disabled={isSubmitting}>
              Zapisz
            </Button>
          </StyledForm>
        )}
      </Formik>
    );
  }
}

export default PasswordForm;
