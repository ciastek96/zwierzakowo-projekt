import React, { Component } from 'react';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from 'components/Button/Button';

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

const StyledLabel = styled.label`
  margin: 0 10px;
`;

const StyledInput = styled.input`
  margin: 0 8px;
`;

const Switch = styled.label`
  display: inline-block;
  position: relative;
  height: 20px;
  width: 40px;
  margin: 0 10px;
`;

const Slider = styled.div`
  background: ${({ theme }) => theme.grey100};
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
    idPost: '',
    created: '',
    sex: '',
    type: '',
    breed: '',
    pedigreed: '',
    idOwner: '',
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt.decode(token);
    this.setState({
      idUser: decoded.idUser,
      username: decoded.username,
    });
  }

  handleTitle = e => {
    this.setState({
      title: e.target.value,
    });
  };
  handleContent = e => {
    this.setState({
      content: e.target.value,
    });
  };

  addNewPost = e => {
    e.preventDefault();
    console.log(this.state);
    const { title, content, idUser, username } = this.state;

    // fetch(`http://localhost:4000/posts/add?title=${title}&content=${content}`)
    //   .then(response => response.json())
    //   .catch(err => console.error(err));

    axios
      .post('http://localhost:4000/posts/add', {
        idUser: idUser,
        username: username,
        title: title,
        content: content,
      })
      .then(res => console.log(res))
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

      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
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
        {({ isSubmitting }) => (
          <StyledFormik>
            <StyledField type="text" name="title" placeholder="Imie / pseudonim" />
            <ErrorMessage name="title" component="div" />
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
              <Switch for="sex">
                <Checkbox type="checkbox" id="sex" />
                <Slider />
              </Switch>
              Samica
            </StyledSelect>
            <ErrorMessage name="sex" component="div" />
            <StyledField type="text" name="type" placeholder="Typ np. pies" />
            <ErrorMessage name="type" component="div" />
            <StyledField type="text" name="breed" placeholder="Rasa np. dalmateńczyk" />
            <ErrorMessage name="breed" component="div" />
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
              <Switch for="pedigreed">
                <Checkbox type="checkbox" id="pedigreed" />
                <Slider />
              </Switch>
              Tak
            </StyledSelect>
            <ErrorMessage name="pedigreed" component="div" />
            <StyledTextarea id="textarea" component="textarea" name="content" placeholder="Opis" />
            <ErrorMessage name="content" component="div" />
            <StyledField type="file" name="photo" placeholder="Zdjęcie" />
            <ErrorMessage name="photo" component="div" />
            <StyledButton type="submit" disabled={isSubmitting}>
              Dodaj
            </StyledButton>
          </StyledFormik>
        )}
      </Formik>
    );
  }
}

export default newPostForm;
