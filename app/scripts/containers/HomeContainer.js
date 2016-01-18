import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchPage } from '../actions';
import { Link } from 'react-router';
import PostCards from '../components/PostCards';
import RecentPosts from '../components/RecentPosts';

// Smart component
class HomeContainer extends Component {
  componentWillMount() {
    const { fetchPosts, fetchPage, pageNum = 1 } = this.props;

    // Bootstrap initial posts
    // TODO: fetch both recent and featured?
    // Should these be done by "sub" containers?
    fetchPosts(pageNum, 10);

    // Fetch featured post via homepage relationship field
    fetchPage('home');
  }

  componentDidUpdate() {
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <PostCards {...this.props} />
        <RecentPosts {...this.props} />
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    // TODO: properly map state to props for all components
    featured: state.pages.home.related_posts,
    posts: state.posts.posts,
    pageNum: state.posts.pageNum,
    totalPages: state.posts.totalPages
  };
}

export default connect(
  mapStateToProps,
  { fetchPosts, fetchPage }
)(HomeContainer);