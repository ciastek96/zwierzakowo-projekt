import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 380px;
  border: black;
  border-radius: 15px;
  box-shadow: 0 1px 30px -10px hsla(0, 0%, 0%, 0.2);
  border: 2px solid ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 999;
`;
const Header = styled.div`
  width: 100%;
  color: white;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.s};
  background-color: ${({ theme }) => theme.primary};
  text-align: center;
  padding: 20px 5px;
`;
const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const OptionsItem = styled.button`
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
  border: none;
  background: white;
  text-align: center;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 20px;
  :first-child {
    border-right: 2px solid ${({ theme }) => theme.primary};
  }
  :hover {
    background: ${({ theme }) => theme.grey100};
  }
`;

const Modal = ({ addNewComment, closeModal }) => (
  <StyledWrapper>
    <Header>Dodać komentarz?</Header>
    <Options>
      <OptionsItem>Tak</OptionsItem>
      <OptionsItem>Nie</OptionsItem>
    </Options>
  </StyledWrapper>
);

export default Modal;
