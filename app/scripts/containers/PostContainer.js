import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPostBySlug, getPageBySlug } from 'selectors';
import { fetchPost, fetchPage } from '../actions';
// import { Link } from 'react-router-dom';
import Post from '../components/Post';
import Post404 from '../components/Post404';

// Smart component
class PostContainer extends Component {
  componentWillMount() {
    const { actions, post, home } = this.props;
    const { postSlug } = this.props.params;

    if (!post || !post.content) actions.fetchPost(postSlug);
    if (!home.sidebar_tiles.length) actions.fetchPage('home');
  }

  componentWillReceiveProps(nextProps) {
    const { actions, post } = nextProps;
    const { postSlug } = nextProps.params;
    const { postSlug: currentPostSlug } = this.props.params;

    if (currentPostSlug === postSlug) return;
    if (!post || !post.content) actions.fetchPost(postSlug);
  }

  render() {
    const { post, home } = this.props;
    if (post && post.error) {
      return <Post404 post={post} sidebarTiles={home.sidebar_tiles} />;
    }
    return <Post post={post} sidebarTiles={home.sidebar_tiles} />;
  }
}

PostContainer.propTypes = {
  post: PropTypes.object,
  home: PropTypes.object,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    home: getPageBySlug(state, 'home'),
    post: getPostBySlug(state, props.params.postSlug)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPost,
      fetchPage
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
