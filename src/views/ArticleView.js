import React, { Component } from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import axios from 'axios';
import Article from 'templates/Article';
import Comments from 'components/Comments/Comments';

class ArticleView extends Component {
  state = {
    post: null,
    idPost: '',
  };

  componentDidMount() {
    //this.getPosts();
    const { id } = this.props.match.params;
    axios
      .get(`http://localhost:4000/posts/${id}`)
      .then(({ data }) =>
        this.setState({
          post: data,
          idPost: id,
        }),
      )
      .catch(err => console.log(err));
  }

  getPosts = () => {
    axios
      .get('http://localhost:4000/posts')
      .then(response => response.data)
      .then(response =>
        this.setState({
          post: response.data,
        }),
      )
      .catch(err => console.error(err));
  };

  render() {
    const { post, idPost } = this.state;
    if (post === null) {
      return <UserPageTemplate></UserPageTemplate>;
    } else {
      return (
        <UserPageTemplate>
          <Article title={post.data[0].title} content={post.data[0].content} />
          <Comments idPost={idPost} />
        </UserPageTemplate>
      );
    }
  }
}

export default ArticleView;
