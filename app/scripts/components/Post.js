import React, { Component } from 'react';
import URI from 'urijs';
import { decodeHtml } from 'utils';
import moment from 'moment';
import classNames from 'classnames';
import 'styles/post.less';

// Dumb component
export default class Post extends Component {
  createMarkup(html) {
    return {
      __html: html
    };
  }

  // TODO - related post and comments, social buttons logic (actions?)

  render() {
    const { post, isFetching } = this.props;
    const postClasses = classNames({ post: true, featured: !!post.featured_image });

    if (isFetching) {
      return (
        <article className="post">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </article>
      );
    }

    let image = null;

    if (post.featured_image) {
      const filename = new URI(post.featured_image.url).filename();
      const imageSrc = '//res.cloudinary.com/laybabylay/image/upload/q_30,w_2400,h_1000,c_fill/' + filename;
      image = (
        <div className="post__featured-image--wrapper">
          <img className="post__featured-image" src={imageSrc} alt={post.title} />
        </div>
      );
    }

    return (
      <article className={postClasses}>

        {image}

        <header className="align-center">
          <h1 className="title">{decodeHtml(post.title)}</h1>
          <h2 className="subtitle">{decodeHtml(post.subtitle)}</h2>

          <div className="meta">
            <div className="date">{moment(post.date).format('MMM Do, YYYY')}</div>
            <div className="color-palette-region" />
          </div>
        </header>

        <div className="content" dangerouslySetInnerHTML={this.createMarkup(post.content)} />

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