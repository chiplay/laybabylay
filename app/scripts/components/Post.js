import React, { Component } from 'react';
import PropTypes from 'prop-types';

import URI from 'urijs';
import moment from 'moment';
import classNames from 'classnames';

import { decodeHtml } from 'utils';
import 'styles/post.less';

export default class Post extends Component {
  createMarkup = (html) => {
    return {
      __html: html
    };
  }

  // TODO - related post and comments, social buttons logic (actions?)

  render() {
    const { post } = this.props;

    if (!post) {
      return (
        <article className="post">
          <div className="spinner">
            <div className="double-bounce1" />
            <div className="double-bounce2" />
          </div>
        </article>
      );
    }

    const {
      content,
      featured_image,
      post_title,
      date,
      subtitle
      // slug,
      // taxonomies = {},
      // category = [],
    } = post;

    const postClasses = classNames({ post: true, featured: !!post.featured_image });

    let image = null;

    if (featured_image) {
      const filename = new URI(featured_image).filename();
      const imageSrc = `//res.cloudinary.com/laybabylay/image/upload/q_30,w_2400,h_1000,c_fill/${filename}`;
      image = (
        <div className="post__featured-image--wrapper">
          <img className="post__featured-image" src={imageSrc} alt={post_title} />
        </div>
      );
    }

    return (
      <article className={postClasses}>

        {image}

        <header className="align-center">
          <h1 className="title">{decodeHtml(post_title)}</h1>
          <h2 className="subtitle">{decodeHtml(subtitle)}</h2>

          <div className="meta">
            <div className="date">{moment(date).format('MMM Do, YYYY')}</div>
            <div className="color-palette-region" />
          </div>
        </header>

        {/* eslint-disable react/no-danger */}
        <div className="content" dangerouslySetInnerHTML={this.createMarkup(content)} />
        {/* eslint-enable react/no-danger */}

        <div className="categories-region" />

        <div className="addthis-region">
          <button className="pinterest-button">Pin It</button>
          <button className="tweet-button">Tweet</button>
          <button className="facebook-button">Share on Facebook</button>
        </div>

        <div className="comments-region" />
        <div className="related-posts-region" />

      </article>

    );
  }
}

Post.propTypes = {
  post: PropTypes.object
};
