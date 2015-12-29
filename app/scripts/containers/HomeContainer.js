import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router';
import PostCards from '../components/PostCards';
import RecentPosts from '../components/RecentPosts';

// Smart component
class HomeContainer extends Component {
  componentWillMount() {
    const { fetchPosts, pageNum = 1 } = this.props;

    // Bootstrap initial posts
    // TODO: fetch both recent and featured?
    // Should these be done by "sub" containers?
    fetchPosts(pageNum);
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
    featured: state.posts.featuredPosts,
    posts: state.posts.posts,
    pageNum: state.posts.pageNum,
    totalPages: state.posts.totalPages
  };
}

export default connect(
  mapStateToProps,
  { fetchPosts }
)(HomeContainer);