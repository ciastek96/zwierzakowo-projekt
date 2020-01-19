import React from 'react';
import Paragraph from './Paragraph';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Paragraph',
  decorators: [withKnobs],
};

export const paragraph = () => {
  return <Paragraph>Paragraph</Paragraph>;
};
