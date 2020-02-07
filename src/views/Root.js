import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';
import PostsView from 'views/PostsView';
import YourPostsView from 'views/YourPostsView';
import RankView from 'views/RankView';
import NewPostView from 'views/NewPostView';
import ArticleView from 'views/ArticleView';
import LogoutView from 'views/LogoutView';
import UserSettingsView from 'views/UserSettingsView';
import { routes } from 'routes/routes';
import PrivateRoute from './PrivateRoute';
import AppContext from '../context/AppContext';

class Root extends Component {
  render() {
    return (
      <Router>
        <MainTemplate>
          <>
            <Switch>
              <Route exact path={routes.home} render={() => <Redirect to={routes.posts} />} />
              <Route exact path={routes.posts} component={PostsView} />
              <Route path={routes.post} component={ArticleView} />
              <Route exact path={routes.yourposts} component={YourPostsView} />
              {/* <PrivateRoute path={routes.yourposts} component={YourPostsView} /> */}
              <Route path={routes.yourpost} component={ArticleView} />
              <Route exact path={routes.rank} component={RankView} />
              <Route path={routes.login} component={LoginView} />
              <Route path={routes.login} component={LoginView} />
              <Route path={routes.register} component={RegisterView} />
              <Route path={routes.settings} component={UserSettingsView} />
              <Route path={routes.newpost} component={NewPostView} />
              <Route path={routes.logout} component={LogoutView} />
            </Switch>
          </>
        </MainTemplate>
      </Router>
    );
  }
}

export default Root;
