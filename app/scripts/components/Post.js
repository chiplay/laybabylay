import React, { Component } from 'react';
import URI from 'urijs';
import { decodeHtml } from 'utils';
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

    let image = <div />;

    if (post.featured_image) {
      const filename = new URI(post.featured_image.url).filename();
      const imageSrc = 'https://res.cloudinary.com/laybabylay/image/upload/f_auto,q_30,w_2400,h_800,c_fill/v1448851561/' + filename;
      image = <img className="post__featured-image" src={imageSrc} alt={post.title} />;
    }

    return (
      <article className="post">

        <div className="post__featured-image--wrapper">
          {image}
        </div>

        <header className="align-center">
          <h1 className="title">{decodeHtml(post.title)}</h1>
          <h2 className="subtitle">{decodeHtml(post.subtitle)}</h2>
        </header>

        <div className="meta">
          <div className="date">{post.date}</div>
          <div className="color-palette-region" />
        </div>

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