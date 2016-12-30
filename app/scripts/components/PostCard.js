import React, { Component } from 'react';
import { Link } from 'react-router';
import URI from 'urijs';
import { decodeHtml } from 'utils';
import 'styles/postcard.less';

export default class PostCard extends Component {

  // TODO - styles and router "Link" to single post

  render() {
    const { post } = this.props;
    const firstImage = post.attachments[0];
    const categories = post.categories || [];
    const category = categories[0] || {};
    const categoryTitle = category.title || '';
    let image = <div />;

    if (firstImage) {
      const filename = new URI(firstImage.url).filename();
      const imageSrc = 'https://res.cloudinary.com/laybabylay/image/upload/f_auto,q_35,w_2000,h_1000,c_fill/v1448851561/' + filename;
      image = <figure className="postcard__image--wrapper"><img className="postcard__image" src={imageSrc} alt={post.title} /></figure>;
    }

    return (
      <Link to={'/' + post.slug}>
        <div className="postcard">

          <header>
              <div className="postcard__category">{categoryTitle}</div>
              <h1 className="postcard__title">{decodeHtml(post.title)}</h1>
              <h2 className="postcard__subtitle">{decodeHtml(post.subtitle)}</h2>

              <div className="postcard__meta">
                <div className="postcard__category">{post.category}</div>
              </div>

              <div className="postcard__link">Read More ></div>

          </header>

          {image}

        </div>
      </Link>
    );
  }
}