import React, { Component } from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import Article from 'components/Article/Article';
import axios from 'axios';

class PostsView extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.getPosts();
  }

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
    return (
      <UserPageTemplate pageType="posts" header="Posty">
        {posts.map(item => (
          <Article
            id={item.idPost}
            title={item.title}
            created={item.created}
            content={item.content}
            key={item.idPost}
            author={item.username}
          />
        ))}
      </UserPageTemplate>
    );
  }
}

export default PostsView;
