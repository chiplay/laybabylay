import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import URI from 'urijs';

import { decodeHtml } from 'utils';
import 'styles/postcard.less';

export default class PostCard extends Component {
  render() {
    const { post } = this.props,
          {
            featured_image,
            post_title,
            slug,
            subtitle,
            category = []
          } = post,
          categoryTitle = category.length && category[0].name;

    let image = <div />;

    if (featured_image) {
      const filename = new URI(featured_image).filename();
      const imageSrc = `//res.cloudinary.com/laybabylay/image/upload/f_auto,q_35,w_2000,h_1000,c_fill/${filename}`;
      image = (
        <figure className="postcard__image--wrapper">
          <img className="postcard__image" src={imageSrc} alt={post_title} />
        </figure>
      );
    }

    return (
      <Link to={`/${slug}`}>
        <div className="postcard">
          <header>
            <div className="postcard__category">{categoryTitle}</div>
            <h1 className="postcard__title">{decodeHtml(post_title)}</h1>
            <h2 className="postcard__subtitle">{decodeHtml(subtitle)}</h2>
            <div className="postcard__link">Read More</div>
          </header>
          {image}
        </div>
      </Link>
    );
  }
}
PostCard.propTypes = {
  post: PropTypes.object.isRequired
};
