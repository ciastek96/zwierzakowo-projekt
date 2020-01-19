import styled, { css } from 'styled-components';

const Button = styled.button`
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 50px;
  width: 120px;
  height: 40px;
  background-color: transparent;
  text-transform: uppercase;
  font-weight: 200;
  letter-spacing: 1.2px;
  font-size: ${({ theme }) => theme.fontSize.xs};

  ${({ white }) =>
    white &&
    css`
      color: ${({ theme }) => theme.white};
      border: 1px solid ${({ theme }) => theme.white};
    `}

  ${({ small }) =>
    small &&
    css`
      color: ${({ theme }) => theme.white};
      border: 1px solid ${({ theme }) => theme.white};
      font-size: ${({ theme }) => theme.fontSize.xxs};
      background-color: ${({ theme }) => theme.primary};
      width: 90px;
      height: 30px;
      font-size: 10px;
    `}
`;

export default Button;
