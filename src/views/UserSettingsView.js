import React, { Component } from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import axios from 'axios';

class UserSettingsView extends Component {
  state = {
    posts: [],
  };

  getPosts = () => {
    axios
      .get('http://localhost:4000/posts')
      .then(response => response.data)
      .then(response =>
        this.setState({
          posts: response.data,
        }),
      )
      .catch(err => console.error(err));
  };

  render() {
    const { posts } = this.state;
    return <UserPageTemplate pageType="posts" header="Ustawienia konta"></UserPageTemplate>;
  }
}

export default UserSettingsView;
