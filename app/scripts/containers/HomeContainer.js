import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPosts, fetchPage } from 'actions';
import PostCards from 'components/PostCards';
import RecentPosts from 'components/RecentPosts';
import Sidebar from 'components/Sidebar';

// Smart component
class HomeContainer extends Component {
  componentWillMount() {
    const {
      actions,
      page,
      posts,
      featured
    } = this.props;

    // Bootstrap initial posts
    if (!posts.length) actions.fetchPosts(page, 10);

    // Fetch featured post via homepage relationship field
    if (!featured.length) actions.fetchPage('home');
  }

  componentDidUpdate() {
  }

  render() {
    const {
      posts,
      popular,
      favorite,
      featured,
      page,
      totalPages,
      isFetching,
      tiles,
      activeFilter,
      actions
    } = this.props;

    return (
      <div>
        <PostCards featured={featured} />

        <div className="home__container">
          <RecentPosts
            posts={posts}
            favorite={favorite}
            popular={popular}
            page={page}
            totalPages={totalPages}
            isFetching={isFetching}
            activeFilter={activeFilter}
            actions={actions}
          />
          <Sidebar tiles={tiles} />
        </div>

      </div>
    );
  }
}

HomeContainer.propTypes = {
  posts: PropTypes.array.isRequired,
  featured: PropTypes.array.isRequired,
  favorite: PropTypes.array.isRequired,
  popular: PropTypes.array.isRequired,
  tiles: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  activeFilter: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    // TODO: properly map state to props for all components
    featured: state.pages.home.featured_posts,
    favorite: state.pages.home.favorite_posts,
    popular: state.pages.home.popular_posts,
    tiles: state.pages.home.sidebar_tiles,
    posts: state.posts.posts,
    page: state.posts.page,
    totalPages: state.posts.totalPages,
    isFetching: state.posts.isFetching,
    activeFilter: state.posts.activeFilter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPosts,
      fetchPage
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
