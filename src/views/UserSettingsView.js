import React, { Component } from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';

class UserSettingsView extends Component {
  state = {};

  render() {
    return <UserPageTemplate header="Ustawienia konta"></UserPageTemplate>;
  }
}

export default UserSettingsView;
