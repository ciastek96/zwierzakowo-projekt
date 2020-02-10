import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserPageTemplate from 'templates/UserPageTemplate';
import EmailUpdateForm from '../components/EmailUpdateForm/EmailUpdateForm';
import UserSettingsForm from '../components/UserSettingsForm/UserSettingsForm';
import PasswordForm from '../components/PasswordForm/PasswordForm';

class UserSettingsView extends Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    if (!localStorage.getItem('usertoken')) {
      this.setState({
        redirect: true,
      });
    }
  }

  render() {
    const { redirect } = this.state;
    return (
      <UserPageTemplate header="Ustawienia konta">
        <EmailUpdateForm />
        <UserSettingsForm />
        <PasswordForm />
        {redirect && <Redirect to="/posts" />}
      </UserPageTemplate>
    );
  }
}

export default UserSettingsView;
