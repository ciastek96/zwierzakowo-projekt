import React, { Component } from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import Article from 'components/Article/Article';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class YourPostsView extends Component {
  state = {
    posts: [],
    idUser: '',
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt.decode(token);
    this.setState({
      idUser: decoded.idUser,
    });
    this.getPosts();
  }

  getPosts = () => {
    const token = localStorage.usertoken;
    const decoded = jwt.decode(token);
    axios
      .post(`http://localhost:4000/yourposts`, {
        idUser: decoded.idUser,
      })
      .then(res => res.data)
      .then(res =>
        this.setState({
          posts: res.data,
        }),
      )
      .catch(err => console.error(err));
  };

  render() {
    const { posts } = this.state;
    return (
      <UserPageTemplate pageType="posts" header="Twoje posty">
        {posts.length > 0 ? (
          posts.map(item => (
            <Article
              id={item.idPost}
              title={item.title}
              created={item.created}
              content={item.content}
              key={item.idPost}
              author="Kamil"
            />
          ))
        ) : (
          <p>Nie dodałeś jeszcze żadnego postu.</p>
        )}
      </UserPageTemplate>
    );
  }
}

export default YourPostsView;
