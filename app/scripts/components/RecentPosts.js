import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'styles/recent-posts.less';
import PostSummary from 'components/PostSummary';

export default class RecentPosts extends Component {

  handlePaginationClick(page) {
    // scroll(0, 0);
    this.props.actions.fetchPosts(page);
  }

  handleFilterClick(filter) {
    // scroll(0, 0);
    this.props.actions.filterPosts(filter);
  }

  buildPosts = (posts) => {
    return posts.map(post => <PostSummary post={post} key={post.post_id} />);
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
      key: 'recent',
      button: <button onClick={() => this.handleFilterClick('recent')}>Recent</button>,
      enabled: activeFilter === 'recent'
    };

    const featuredFilter = {
      key: 'favorite',
      button: <button onClick={() => this.handleFilterClick('featured')}>Featured</button>,
      enabled: activeFilter === 'featured'
    };

    return (
      <ul className="post-filters">
        {[recentFilter, featuredFilter].map((filter) => (
          <li key={filter.key} className={filter.active ? 'active' : ''}>
            {filter.button}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const {
      posts,
      totalPages,
      page,
      activeFilter,
      isFetching
    } = this.props;

    return (
      <div className="recent-posts">
        {this.buildFilters(activeFilter)}
        {this.buildPosts(posts)}
        {this.buildPagination(page, totalPages, isFetching)}
      </div>
    );
  }
}

RecentPosts.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  favorite: PropTypes.array.isRequired,
  popular: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired
};
