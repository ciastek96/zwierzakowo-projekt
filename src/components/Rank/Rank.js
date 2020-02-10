import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Paragraph from '../Paragraph/Paragraph';

const StyledWrapper = styled.div`
  width: 80%;
  border-radius: 25px;
  box-shadow: 0 1px 30px -10px hsla(0, 0%, 0%, 0.1);
  margin: 30px auto;
  overflow: hidden;
`;

const StyledHeader = styled.div`
  background: ${({ theme }) => theme.primary};
`;

const Title = styled(Paragraph)`
  padding: 20px;
  color: white;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledInnerWrapper = styled.div``;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 2fr;
  align-items: center;
  height: 100%;
`;

const Cell = styled.div`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.grey100};
  text-align: center;
`;
const CellHeaders = styled(Cell)`
  font-weight: bold;
`;

class Rank extends Component {
  state = {
    rank: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:4000/rank')
      .then(res => {
        this.setState({
          rank: res.data,
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { rank } = this.state;
    let counter = 0;
    return (
      <StyledWrapper>
        <StyledHeader>
          <Title>Najlepiej oceniane posty</Title>
        </StyledHeader>
        <StyledInnerWrapper>
          <Row>
            <CellHeaders>Miejsce</CellHeaders>
            <CellHeaders>Tytuł</CellHeaders>
            <CellHeaders>Ocena</CellHeaders>
            <CellHeaders>Autor</CellHeaders>
          </Row>
          {rank.map(item => (
            <Row key={counter++}>
              <Cell>{counter}</Cell>
              <Cell>{item.title}</Cell>
              <Cell>{item.ocena.toFixed(2)}</Cell>
              <Cell>{item.username}</Cell>
            </Row>
          ))}
        </StyledInnerWrapper>
      </StyledWrapper>
    );
  }
}

export default Rank;
