import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { Link } from 'react-router';
import Post from '../components/Post';

// Smart component
class PostContainer extends Component {
  componentWillMount() {
    const { fetchPost } = this.props;
    const { postSlug } = this.props.params;
    fetchPost(postSlug);
  }

  buildPost(post) {
    return <Post post={post} foo="bar" />
  }

  componentDidUpdate() {
  }

  render() {
    const { post } = this.props;

    console.log('PostContainer:render');

    return (
      <article className="post">
        {this.buildPost(post)}
      </article>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.activePost
  };
}

export default connect(
  mapStateToProps,
  { fetchPost }
)(PostContainer);