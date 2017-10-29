import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPostBySlug } from 'selectors';
import { fetchPost } from '../actions';
// import { Link } from 'react-router';
import Post from '../components/Post';

// Smart component
class PostContainer extends Component {
  componentWillMount() {
    const { actions, post } = this.props;
    const { postSlug } = this.props.params;

    if (!post) actions.fetchPost(postSlug);
  }

  render() {
    const { post } = this.props;
    return <Post post={post} />;
  }
}

PostContainer.propTypes = {
  post: PropTypes.object,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    post: getPostBySlug(state, props.params.postSlug)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPost
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
