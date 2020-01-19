import React from 'react';
import Input from './Input';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Input',
  decorators: [withKnobs],
};

export const input = () => {
  const name = text('children', 'placeholder');
  return <Input placeholder={name} />;
};

export const search = () => {
  const name = text('children', 'search');
  const value = boolean('is search?', 'true');
  return <Input search={value} placeholder={name} />;
};
