import React from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import Article from 'components/Article/Article';

const PostsView = () => (
  <UserPageTemplate pageType="posts" header="Posty">
    <Article />
    <Article />
    <Article />
    <Article />
    <Article />
  </UserPageTemplate>
);
export default PostsView;
