import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';
import PostsView from 'views/PostsView';
import RankView from 'views/RankView';
import NewPostView from 'views/NewPostView';

const Root = () => (
  <Router>
    <MainTemplate>
      <>
        <Switch>
          <Route exact path="/" component={PostsView} />
          <Route path="/posts" component={PostsView} />
          <Route path="/yourposts" component={PostsView} />
          <Route path="/rank" component={RankView} />
          <Route path="/login" component={LoginView} />
          <Route path="/register" component={RegisterView} />
          <Route path="/newpost" component={NewPostView} />
        </Switch>
      </>
    </MainTemplate>
  </Router>
);

export default Root;
