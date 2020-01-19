import React from 'react';
import NewPostForm from 'components/NewPostForm/NewPostForm';
import UserPageTemplate from '../templates/UserPageTemplate';

const NewPostView = () => (
  <UserPageTemplate header="Dodaj nowy post">
    <NewPostForm />
  </UserPageTemplate>
);

export default NewPostView;
