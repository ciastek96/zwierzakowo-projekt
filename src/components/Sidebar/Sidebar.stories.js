import React from 'react';
import Sidebar from './Sidebar';

import StoryRouter from 'storybook-react-router';

export default { title: 'Sidebar', decorators: [StoryRouter()] };

export const sidebar = () => <Sidebar />;
