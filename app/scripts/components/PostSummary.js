import React, { Component } from 'react';
import { Link } from 'react-router';
import { decodeHtml } from 'utils';

import URI from 'urijs';
import 'styles/post-summary.less';

export default class PostSummary extends Component {

  // TODO - styles and router "Link" to single post

  render() {
    const { post } = this.props;
    const firstImage = post.attachments[0];
    let image = <div />;

    if (firstImage) {
      const filename = new URI(firstImage.url).filename();
      const imageSrc = 'https://res.cloudinary.com/laybabylay/image/upload/f_auto,q_40,w_400,h_400,r_200,c_fill/v1448851561/' + filename;
      image = <figure className="post-summary__image--wrapper"><img className="post-summary__image" src={imageSrc} alt={post.title} /></figure>;
    }

    return (
      <div className="post-summary">

        {image}

        <div className="post-summary__content">

          <div className="post-summary__meta">
            <div className="post-summary__category">{post.category}</div>
          </div>

          <header>
            <h1 className="post-summary__title">{decodeHtml(post.title)}</h1>
            <h2 className="post-summary__subtitle">{decodeHtml(post.subtitle)}</h2>
          </header>

          <p className="post-summary__excerpt">{decodeHtml(post.excerpt)}</p>

          <Link className="post-summary__link" to={'/' + post.slug}>Read More</Link>

        </div>

      </div>
    );
  }
}