import React from 'react';
import styled from 'styled-components';
import { withKnobs } from '@storybook/addon-knobs';
import Button from './Button';

const Bg = styled.div`
  background-color: lightgrey;
  height: 300px;
  width: 300px;
`;

export default {
  title: 'Button',
  decorators: [withKnobs, storyFn => <Bg>{storyFn()}</Bg>],
};

export const button = () => <Button>Dodaj</Button>;
export const buttonInverse = () => <Button white>Dodaj</Button>;
