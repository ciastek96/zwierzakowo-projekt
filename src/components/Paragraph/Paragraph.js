import styled, { css } from 'styled-components';

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  color: black;
  font-weight: ${({ theme }) => theme.light};

  ${({ big }) =>
    big &&
    css`
      font-size: ${({ theme }) => theme.fontSize.m};
    `}
`;

export default Paragraph;
