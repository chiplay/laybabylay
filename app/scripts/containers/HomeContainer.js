import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchPage } from '../actions';
import { Link } from 'react-router';
import PostCards from '../components/PostCards';
import RecentPosts from '../components/RecentPosts';
import Sidebar from '../components/Sidebar';

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

        <div className="home__container">
          <RecentPosts {...this.props} />
          <Sidebar {...this.props} />
        </div>

      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    // TODO: properly map state to props for all components
    featured: state.pages.home.featured_posts,
    favorite: state.pages.home.favorite_posts,
    popular: state.pages.home.popular_posts,
    tiles: state.pages.home.sidebar_tiles,
    posts: state.posts.posts,
    pageNum: state.posts.pageNum,
    totalPages: state.posts.totalPages
  };
}

export default connect(
  mapStateToProps,
  { fetchPosts, fetchPage }
)(HomeContainer);