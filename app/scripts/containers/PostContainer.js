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

  componentDidUpdate() {
  }

  render() {
    const { post } = this.props;

    console.log('PostContainer:render');

    return (
      <Post {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.activePost,
    isFetching: state.posts.isFetching
  };
}

export default connect(
  mapStateToProps,
  { fetchPost }
)(PostContainer);