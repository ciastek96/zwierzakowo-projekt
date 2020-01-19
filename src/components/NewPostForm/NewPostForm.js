import React from 'react';
import styled from 'styled-components';
import Input from 'components/Input/Input';
import Textarea from 'components/Textarea/Textarea';
import Button from 'components/Button/Button';

const StyledForm = styled.div`
  margin: 60px auto 25px;
  padding: 35px;
  max-width: 720px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`;

const StyledButton = styled(Button)``;

const LoginForm = ({ formType }) => (
  <StyledForm>
    <Input placeholder="tytuł" type="text" required />
    <Textarea placeholder="opis" />
    <Input placeholder="zdjęcie" type="file" required />
    <StyledButton type="image">Dodaj</StyledButton>
  </StyledForm>
);

export default LoginForm;
