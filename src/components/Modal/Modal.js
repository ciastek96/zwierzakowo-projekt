import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.primary};
`;
/*
class Modal extends React.Component {
  state = {
    isOpen: true,
  };

  render() {
    return <StyledWrapper></StyledWrapper>;
  }
}
*/

const Modal = () => <StyledWrapper></StyledWrapper>;

export default Modal();
