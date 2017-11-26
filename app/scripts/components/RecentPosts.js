import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'grid-styled';
import utils from 'utils';

import { RECENT_POSTS, FAVORITE_POSTS, POPULAR_POSTS } from 'reducers/pages';

import 'styles/recent-posts.less';
import PostSummary from 'components/PostSummary';

export default class RecentPosts extends Component {

  componentWillMount() {
    const { actions, home } = this.props;

    // Bootstrap initial posts
    if (!home.recent_posts.length) actions.fetchPosts(home.page, 10);
  }

  handlePaginationClick(page) {
    // scroll(0, 0);
    this.props.actions.fetchPosts(page);
  }

  handleFilterClick(filter) {
    // scroll(0, 0);
    window.scrollTo(0, utils.metrics.isPhone ? 480 : 560);
    this.props.actions.setActiveFilter(filter);
  }

  buildPosts = (activePosts) => {
    return activePosts.map(post => <PostSummary post={post} key={post.post_id} />);
  }

  buildPagination(page, totalPages, isFetching, activeFilter) {
    if (isFetching) {
      return (
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      );
    } else if (page !== totalPages && activeFilter === RECENT_POSTS) {
      return (
        <button type="button" className="load-more" onClick={() => this.handlePaginationClick(page + 1)}>Show More +</button>
      );
    }
    if (activeFilter !== RECENT_POSTS) return null;
    return (
      <button type="button" className="load-more load-more--fin">That is all!</button>
    );
  }

  buildFilters(activeFilter) {
    const recentFilter = {
      key: RECENT_POSTS,
      button: <button onClick={() => this.handleFilterClick(RECENT_POSTS)}>Recent</button>,
      enabled: activeFilter === RECENT_POSTS
    };

    const featuredFilter = {
      key: FAVORITE_POSTS,
      button: <button onClick={() => this.handleFilterClick(FAVORITE_POSTS)}>Featured</button>,
      enabled: activeFilter === FAVORITE_POSTS
    };

    const popularFilter = {
      key: POPULAR_POSTS,
      button: <button onClick={() => this.handleFilterClick(POPULAR_POSTS)}>Popular</button>,
      enabled: activeFilter === POPULAR_POSTS
    };

    return (
      <Flex mb={20} className="post-filters">
        <Box width={1/7} key="label" className="filter-label">Filter by:</Box>
        {[recentFilter, featuredFilter, popularFilter].map((filter) => (
          <Box width={[1/3, 2/7, 2/7, 2/7]} key={filter.key} className={filter.enabled ? 'post-filter active' : 'post-filter'}>
            {filter.button}
          </Box>
        ))}
      </Flex>
    );
  }

  render() {
    const { home, activePosts } = this.props,
          {
            activeFilter,
            page,
            totalPages,
            isFetching
          } = home;

    return (
      <Box width={[1, 1, 1, 2/3]} mb={20} className="recent-posts">
        {this.buildFilters(activeFilter)}
        {this.buildPosts(activePosts)}
        {this.buildPagination(page, totalPages, isFetching, activeFilter)}
      </Box>
    );
  }
}

RecentPosts.propTypes = {
  actions: PropTypes.object.isRequired,
  activePosts: PropTypes.array.isRequired,
  home: PropTypes.object.isRequired
};
