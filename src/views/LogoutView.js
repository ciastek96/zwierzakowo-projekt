import React, { Component } from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';

class LogoutView extends Component {
  state = {};

  componentDidMount() {
    this.logoutUserFn();
  }

  logoutUserFn = () => {
    localStorage.removeItem('usertoken');
    this.props.history.push('/');
  };

  render() {
    return (
      <UserPageTemplate>
        <h2>Wylogowano</h2>
      </UserPageTemplate>
    );
  }
}

export default LogoutView;
