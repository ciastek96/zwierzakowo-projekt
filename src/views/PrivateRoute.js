import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from '../routes/routes';

class PrivateRoute extends Component {
  state = {
    isUserLogged: false,
  };

  isLogged() {
    if (localStorage.getItem('usertoken')) {
      return true;
    }
  }

  render() {
    const { isUserLogged } = this.isLogged;
    const { path, component } = this.props;
    return (
      <>
        {isUserLogged ? (
          <Route exact path={path} component={component} />
        ) : (
          <Redirect to={routes.posts} />
        )}
      </>
    );
  }
}

export default PrivateRoute;
