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

const StyledInput = styled(Input)`
  background-color: ${({ theme }) => theme.grey100};
  ::placeholder {
    text-transform: none;
  }
  &:disabled {
    cursor: no-drop;
  }
`;

const StyledErrorMessage = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding-left: 20px;
`;

const StyledButton = styled(Button)`
  margin-left: 15px;
`;

class UserSettingsForm extends Component {
  state = {
    email: '',
    username: '',
    name: '',
    surname: '',
    sex: '',
    age: '',
    content: '',
    disabled: true,
    redirect: false,
  };

  componentDidMount() {
    if (localStorage.getItem('usertoken')) {
      const token = localStorage.usertoken;
      const decoded = jwt.decode(token);
      this.setState({
        idUser: decoded.idUser,
        username: decoded.username,
      });
      axios
        .post('http://localhost:4000/owner', {
          idUser: decoded.idUser,
        })
        .then(res => {
          console.log(res.data[0]);
          this.setState({
            name: res.data[0].name,
            surname: res.data[0].surname,
            age: res.data[0].age,
            sex: res.data[0].sex,
            content: res.data[0].content,
          });
        })
        .catch(err => console.error(err));
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  render() {
    return (
      <Formik
        initialValues={{
          name: '',
          surname: '',
          age: '',
          sex: '',
          content: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Pole nie może być puste.';
          } else if (!/^[a-zA-Z]+$/.test(values.name)) {
            errors.name = 'Użyto niedozwolonych znaków';
          } else {
            this.setState({
              name: values.name,
            });
          }
          if (!values.surname) {
            errors.surname = 'Pole nie może być puste.';
          } else if (!/^[a-zA-Z]+$/.test(values.surname)) {
            errors.surname = 'Użyto niedozwolonych znaków';
          } else {
            this.setState({
              surnname: values.surnname,
            });
          }
          if (!isNaN(values.age)) {
            errors.age = 'Wpisz poprawną wartość';
          } else if (values.age < 0 || values.age >= 120) {
            errors.age = 'Podano nieprawidłowy wiek';
          } else {
            this.setState({
              age: values.age,
            });
          }
          if (!values.content) {
            errors.content = 'Uzupełnij pole';
          } else {
            this.setState({
              content: values.content,
            });
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
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
            <h1>Dane osobowe</h1>
            <StyledInput
              type="text"
              name="name"
              placeholder={'Imię: ' + this.state.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              disabled={this.state.disabled}
            />
            <StyledErrorMessage>{errors.name && touched.name && errors.name}</StyledErrorMessage>

            {/* <label htmlFor="surname">Nazwisko</label> */}
            <StyledInput
              type="text"
              name="surname"
              placeholder={'Nazwisko: ' + this.state.surname}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.surname}
              disabled={this.state.disabled}
            />
            <StyledErrorMessage>
              {errors.surname && touched.surname && errors.surname}
            </StyledErrorMessage>
            {/* <label htmlFor="age">Wiek</label> */}
            <StyledInput
              type="number"
              name="age"
              placeholder={'Wiek: ' + this.state.age}
              // min="0"
              // max="120"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.age}
              disabled={this.state.disabled}
            />
            <StyledErrorMessage>{errors.age && touched.age && errors.age}</StyledErrorMessage>
            {/* <label htmlFor="content">Napisz coś o sobie!</label> */}
            <StyledInput
              type="textarea"
              name="content"
              placeholder="Napisz coś o sobie!"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
              disabled={this.state.disabled}
            />
            <StyledErrorMessage>
              {errors.content && touched.content && errors.content}
            </StyledErrorMessage>
            <div>
              <Button
                type="submit"
                disabled
                // disabled={isSubmitting}
              >
                Zapisz
              </Button>
              <StyledButton
                type="button"
                disabled
                onClick={() => this.setState({ disabled: false })}
              >
                Edytuj
              </StyledButton>
            </div>
          </StyledForm>
        )}
      </Formik>
    );
  }
}

export default UserSettingsForm;
