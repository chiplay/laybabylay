import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this.props.actions.setActiveFilter(filter);
  }

  buildPosts = (activePosts) => {
    return activePosts.map(post => <PostSummary post={post} key={post.post_id} />);
  }

  buildPagination(page, totalPages, isFetching) {
    if (isFetching) {
      return (
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      );
    } else if (page !== totalPages) {
      return (
        <button type="button" className="load-more" onClick={() => this.handlePaginationClick(page + 1)}>Show More +</button>
      );
    }
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
      <ul className="post-filters">
        <li key="label" className="filter-label">Filter by:</li>
        {[recentFilter, featuredFilter, popularFilter].map((filter) => (
          <li key={filter.key} className={filter.enabled ? 'active' : ''}>
            {filter.button}
          </li>
        ))}
      </ul>
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
      <div className="recent-posts">
        {this.buildFilters(activeFilter)}
        {this.buildPosts(activePosts)}
        {this.buildPagination(page, totalPages, isFetching)}
      </div>
    );
  }
}

RecentPosts.propTypes = {
  actions: PropTypes.object.isRequired,
  activePosts: PropTypes.array.isRequired,
  home: PropTypes.object.isRequired
};
