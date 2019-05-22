import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPostBySlug, getPageBySlug } from '../selectors';
import { fetchPost, fetchPage } from '../actions';
// import { Link } from 'react-router-dom';
import Post from '../components/Post';
import Post404 from '../components/Post404';

// Smart component
class PostContainer extends Component {
  componentWillMount() {
    const { actions, post, home } = this.props;
    const { postSlug } = this.props.match.params;

    if (!post || !post.content) {
      actions.fetchPost(postSlug);
    } else if (window.gtag) {
      window.gtag('config', 'UA-5123840-19', {
        'page_title': post.post_title,
        'page_location': `https://www.laybabylay.com/${postSlug}`,
        'page_path': `/${postSlug}`
      });
    }
    if (!home.sidebar_tiles.length) actions.fetchPage('home');
  }

  componentWillReceiveProps(nextProps) {
    const { actions, post } = nextProps;
    const { postSlug } = nextProps.match.params;
    const { postSlug: currentPostSlug } = this.props.match.params;

    if (currentPostSlug === postSlug) return;
    if (!post || !post.content) {
      actions.fetchPost(postSlug);
    } else if (window.gtag) {
      window.gtag('config', 'UA-5123840-19', {
        'page_title': post.post_title,
        'page_location': `https://www.laybabylay.com/${postSlug}`,
        'page_path': `/${postSlug}`
      });
    }
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
  match: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    home: getPageBySlug(state, 'home'),
    post: getPostBySlug(state, props.match.params.postSlug)
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

PostContainer.fetchData = fetchPost;

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
