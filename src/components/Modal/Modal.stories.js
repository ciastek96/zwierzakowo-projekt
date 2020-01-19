import React from 'react';
import Modal from './Modal';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Modal',
  decorators: [withKnobs],
};

export const login = () => <Modal />;
