import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Input from 'components/Input/Input';
import Heading from 'components/Heading/Heading';
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

const StyledInput = styled(Input)`
  ::placeholder {
    text-transform: none;
  }
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

class EmailUpdateForm extends Component {
  state = {
    email: '',
    idUser: '',
    success: '',
  };

  componentDidMount() {
    if (localStorage.getItem('usertoken')) {
      const token = localStorage.usertoken;
      const decoded = jwt.decode(token);
      this.setState({
        idUser: decoded.idUser,
        email: decoded.username,
      });
      axios
        .post('http://localhost:4000/user', {
          idUser: decoded.idUser,
        })
        .then(res => {
          this.setState({
            email: res.data[0].email,
          });
        })
        .catch(err => console.error(err));
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  updateEmail = () => {
    axios
      .post('http://localhost:4000/email', {
        idUser: this.state.idUser,
        email: this.state.email,
      })
      .then(res => {
        this.setState({
          success: res.data.success,
        });
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Pole wymagane';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Nieprawidłowy adres email';
          } else {
            this.setState({
              email: values.email,
            });
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            this.updateEmail();
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
            <Heading>Zmień email</Heading>
            {this.state.success && <Success>{this.state.success}</Success>}
            <StyledInput
              type="email"
              name="email"
              placeholder={this.state.email}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <StyledErrorMessage>{errors.email && touched.email && errors.email}</StyledErrorMessage>
            <Button type="submit" disabled={isSubmitting}>
              Zapisz
            </Button>
          </StyledForm>
        )}
      </Formik>
    );
  }
}

export default EmailUpdateForm;
