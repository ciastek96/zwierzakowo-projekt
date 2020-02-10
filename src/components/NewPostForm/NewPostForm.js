import React, { Component } from 'react';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from 'components/Button/Button';
import { Redirect } from 'react-router-dom';

const StyledFormik = styled(Form)`
  margin: 0 auto 25px;
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

const StyledTextarea = styled(StyledField)`
  padding: 15px 30px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.grey100};
  border: none;
  border-radius: 15px;
  resize: none;
  height: 300px;
`;

const StyledButton = styled(Button)``;

const StyledSelect = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.grey300};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-transform: uppercase;

  p {
    margin-right: 35px;
  }
`;
const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding-left: 20px;
`;

const Switch = styled.label`
  display: inline-block;
  position: relative;
  height: 20px;
  width: 40px;
  margin: 0 10px;
`;

const Slider = styled.div`
  background: ${({ theme }) => theme.primary};
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 50px;
  transition: 0.3s;

  :before {
    content: '';
    background: white;
    bottom: 3px;
    height: 14px;
    left: 3px;
    position: absolute;
    transition: 0.3s;
    width: 14px;
    border-radius: 50%;
  }
`;

const Checkbox = styled.input`
  display: none;
  :checked + ${Slider} {
    background: ${({ theme }) => theme.primary};
  }
  :checked + ${Slider}:before {
    transform: translateX(20px);
  }
`;

class newPostForm extends Component {
  state = {
    title: '',
    content: '',
    idUser: '',
    username: '',
    sex: false,
    type: '',
    breed: '',
    pedigreed: false,
    idOwner: '',
    redirect: false,
  };

  componentDidMount() {
    if (localStorage.getItem('usertoken')) {
      const token = localStorage.usertoken;
      const decoded = jwt.decode(token);
      this.setState({
        idUser: decoded.idUser,
        idOwner: decoded.idUser,
        username: decoded.username,
      });
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  toggleSex = e => {
    this.setState({
      sex: !this.state.sex,
    });
  };

  togglePedigreed = e => {
    this.setState({
      pedigreed: !this.state.pedigreed,
    });
  };

  addNewPost = () => {
    const { title, content, idUser, username, sex, type, breed, pedigreed, photo } = this.state;
    let sexValue, pedigreedVal;
    if (sex) {
      sexValue = 'samica';
    } else {
      sexValue = 'samiec';
    }
    if (pedigreed) {
      pedigreedVal = 1;
    } else {
      pedigreedVal = 0;
    }

    axios
      .post('http://localhost:4000/posts/add', {
        idUser: idUser,
        username: username,
        title: title,
        sex: sexValue,
        type: type,
        breed: breed,
        pedigreed: pedigreedVal,
        photo: photo,
        content: content,
        redirect: false,
      })
      .then(res =>
        this.setState({
          redirect: true,
        }),
      )
      .catch(err => console.error(err));
  };

  render() {
    return (
      // <StyledForm onSubmit={this.addNewPost}>
      //   <Input placeholder="tytuł" type="text" name="title" required onChange={this.handleTitle} />
      //   <Textarea placeholder="opis" name="description" required onChange={this.handleContent} />
      //   <Input placeholder="zdjęcie" name="image" type="file" />
      //   <StyledButton type="submit">Dodaj</StyledButton>
      // </StyledForm>
      <>
        {this.state.redirect && <Redirect to="/" />}
        <Formik
          initialValues={{
            title: '',
            content: '',
            idUser: '',
            username: '',
            idPost: '',
            sex: false,
            type: '',
            breed: '',
            pedigreed: false,
          }}
          validate={values => {
            const errors = {};
            if (!values.title) {
              errors.title = 'Pole wymagane.';
            } else if (!/^[a-z0-9_-]{3,16}$/gim.test(values.title)) {
              errors.title =
                'Pole musi zawierać min. 3 znaków i nie może zawierać znaków specjalnych.';
            } else {
              this.setState({
                title: values.title,
              });
            }
            if (!values.content) {
              errors.content = 'Pole wymagane.';
            } else if (values.content.trim().length < 10) {
              errors.content = 'Pole musi zawierać min. 10 znaków.';
            } else {
              this.setState({
                content: values.content,
              });
            }
            if (!values.type) {
              errors.type = 'Pole wymagane';
            } else {
              this.setState({
                type: values.type,
              });
            }
            if (values.breed) {
              this.setState({
                breed: values.breed,
              });
            }
            if (values.sex.checked) {
              this.setState({
                sex: 'samica',
              });
            }
            if (values.pedigreed.checked) {
              this.setState({
                pedigreed: true,
              });
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              this.addNewPost();
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <StyledFormik>
              <StyledField type="text" name="title" placeholder="Imie, pseudonim" />
              <StyledErrorMessage name="title" component="div" />
              {/* <StyledSelect>
              Płeć:
              <StyledLabel>
                <StyledInput type="radio" name="sex" value="m" />
                samiec
              </StyledLabel>
              <StyledLabel>
                <StyledInput type="radio" name="sex" value="f" />
                samica
              </StyledLabel>
            </StyledSelect> */}
              <StyledSelect>
                <p>Płeć: </p>Samiec
                {/* <StyledLabel>
                <StyledInput type="radio" name="pedigreed" value="false" />
                nie
              </StyledLabel>
              <StyledLabel>
                <StyledInput type="radio" name="pedigreed" value="true" />
                tak
              </StyledLabel> */}
                <Switch htmlFor="sex">
                  <Checkbox type="checkbox" id="sex" onClick={this.toggleSex} />
                  <Slider />
                </Switch>
                Samica
              </StyledSelect>
              <StyledErrorMessage name="sex" component="div" />
              <StyledField type="text" name="type" placeholder="Typ np. pies" />
              <StyledErrorMessage name="type" component="div" />
              <StyledField type="text" name="breed" placeholder="Rasa np. dalmateńczyk" />
              <StyledErrorMessage name="breed" component="div" />
              <StyledSelect>
                <p>Rodowód: </p>Nie
                {/* <StyledLabel>
                <StyledInput type="radio" name="pedigreed" value="false" />
                nie
              </StyledLabel>
              <StyledLabel>
                <StyledInput type="radio" name="pedigreed" value="true" />
                tak
              </StyledLabel> */}
                <Switch htmlFor="pedigreed">
                  <Checkbox type="checkbox" id="pedigreed" onClick={this.togglePedigreed} />
                  <Slider />
                </Switch>
                Tak
              </StyledSelect>
              <StyledErrorMessage name="pedigreed" component="div" />
              <StyledTextarea
                id="textarea"
                component="textarea"
                name="content"
                placeholder="Opis"
              />
              <StyledErrorMessage name="content" component="div" />
              {/* <StyledField type="file" name="photo" placeholder="Zdjęcie" />
              <StyledErrorMessage name="photo" component="div" /> */}
              <StyledButton type="submit" disabled={isSubmitting}>
                Dodaj
              </StyledButton>
            </StyledFormik>
          )}
        </Formik>
        {this.state.redirect && <Redirect to="/posts" />}
      </>
    );
  }
}

export default newPostForm;
