import React from 'react';
import styled from 'styled-components';
import Input from 'components/Input/Input';
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
    <Input placeholder="login" type="text" required />
    {formType === 'register' && <Input placeholder="email" type="email" required />}
    <Input placeholder="hasło" type="password" required />
    {formType === 'register' && <Input placeholder="powtórz hasło" type="password" required />}
    <StyledButton type="submit">Zaloguj</StyledButton>
  </StyledForm>
);

export default LoginForm;
