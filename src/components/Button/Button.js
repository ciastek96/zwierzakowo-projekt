import styled, { css } from 'styled-components';
import BackArrowIcon from 'assets/svg/arrow-left.svg';

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
  cursor: pointer;
  transition: transform 0.15s ease-in-out;

  :focus {outline:0;}

  :hover {
    transform: scale(1.05, 1.05);

  }
  &:disabled{
    cursor: no-drop;
  }

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

    ${({ round }) =>
      round &&
      css`
        font-size: ${({ theme }) => theme.fontSize.m};
        background: url(${BackArrowIcon}) no-repeat;
        background-position: 50% 50%;
        background-size: 70%;
        width: 60px;
        height: 60px;
        font-size: 10px;
        cursor: pointer;
        left: 0;
        transition: transform 0.15s ease-in-out;

        :hover {
          transform: scale(1.1, 1.1);
        }
      `}
`;

export default Button;
