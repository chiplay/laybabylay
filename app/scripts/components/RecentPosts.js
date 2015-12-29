import React, { Component } from 'react';
import { Link } from 'react-router';
import PostCard from '../components/PostCard';

export default class RecentPosts extends Component {

  buildPosts(posts) {
    return posts.map(post =>
      <PostCard post={post} key={post.id} />
    );
  }

  handlePaginationClick(pageNum) {
    console.log('pagination clicked');

    // scroll(0, 0);

    this.props.fetchPosts(pageNum);
  }

  buildPagination(pageNum, totalPages) {
    const prevText = 'Previous';
    const nextText = 'Next';

    let prevLink = {
      link: <a>{prevText}</a>,
      enabled: false
    };

    let nextLink = {
      link: <Link to={'/' + (pageNum + 1)} onClick={() => this.handlePaginationClick(pageNum + 1)}>{nextText}</Link>,
      enabled: true
    };

    if (pageNum > 1 && pageNum < totalPages) {
      prevLink.link = <Link to={'/' + (pageNum - 1)} onClick={() => this.handlePaginationClick(pageNum - 1)}>{prevText}</Link>;
      prevLink.enabled = true;
    } else if (pageNum == totalPages) {
      nextLink.link = <a>{nextText}</a>;
      nextLink.enabled = false;

      prevLink.link = <Link to={'/' + (pageNum - 1)} onClick={() => this.handlePaginationClick(pageNum - 1)}>{prevText}</Link>;
      prevLink.enabled = true;
    }

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

  render() {
    const { posts, totalPages, pageNum = 1 } = this.props;

    console.log('PostCardsContainer:render');

    return (
      <div className="postcards">

        {this.buildPosts(posts)}

        {this.buildPagination(parseInt(pageNum), totalPages)}

      </div>
    );
  }
}