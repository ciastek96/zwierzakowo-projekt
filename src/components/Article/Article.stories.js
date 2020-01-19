import React from 'react';
import Article from './Article';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Articles',
  decorators: [withKnobs],
};

export const article = () => {
  return <Article />;
};
