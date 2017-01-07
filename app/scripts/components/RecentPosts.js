import React, { Component } from 'react';
import { Link } from 'react-router';
import PostSummary from '../components/PostSummary';
import 'styles/recent-posts.less';

export default class RecentPosts extends Component {

  handlePaginationClick(pageNum) {
    // scroll(0, 0);
    this.props.fetchPosts(pageNum);
  }

  handleFilterClick(filter) {
    // scroll(0, 0);
    // this.props.filterPosts(filter);
  }

  buildPosts(posts) {
    return posts.map(post =>
      <PostSummary post={post} key={post.id} />
    );
  }

  buildPagination(pageNum, totalPages, isFetching) {
    const prevText = 'Previous';
    const nextText = 'Next';

    let prevLink = {
      link: <a>{prevText}</a>,
      enabled: false
    };

    let nextLink = {
      link: <Link to={'/posts/' + (pageNum + 1)} onClick={() => this.handlePaginationClick(pageNum + 1)}>{nextText}</Link>,
      enabled: true
    };

    if (pageNum > 1 && pageNum < totalPages) {
      prevLink.link = <Link to={'/posts/' + (pageNum - 1)} onClick={() => this.handlePaginationClick(pageNum - 1)}>{prevText}</Link>;
      prevLink.enabled = true;
    } else if (pageNum == totalPages) {
      nextLink.link = <a>{nextText}</a>;
      nextLink.enabled = false;

      prevLink.link = <Link to={'/posts/' + (pageNum - 1)} onClick={() => this.handlePaginationClick(pageNum - 1)}>{prevText}</Link>;
      prevLink.enabled = true;
    }

    if (isFetching) {
      return (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      );
    } else {
      return (
        <nav>
          <ul className="pager">
            {[prevLink, nextLink].map((link, index) =>
              <li key={index} className={link.enabled ? '' : 'disabled'}>
                {link.link}
              </li>
            )}
          </ul>
        </nav>
      );
    }
  }

  buildFilters(activeFilter) {
    let recentFilter = {
      button: <button onClick={() => this.handleFilterClick('recent')}>Recent</button>,
      enabled: activeFilter === 'recent' ? true : false
    };

    let featuredFilter = {
      button: <button onClick={() => this.handleFilterClick('featured')}>Featured</button>,
      enabled: activeFilter === 'featured' ? true : false
    };

    return (
      <ul className="post-filters">
        {[recentFilter, featuredFilter].map((filter, index) =>
          <li key={index} className={filter.active ? 'active' : ''}>
            {filter.button}
          </li>
        )}
      </ul>
    );
  }

  render() {
    const {
      posts,
      totalPages,
      pageNum = 1,
      activeFilter = 'recent',
      isFetching
    } = this.props;

    console.log('RecentPosts:render');

    return (
      <div className="recent-posts">

        {this.buildFilters(activeFilter)}

        {this.buildPosts(posts)}

        {this.buildPagination(parseInt(pageNum), totalPages, isFetching)}

      </div>
    );
  }
}