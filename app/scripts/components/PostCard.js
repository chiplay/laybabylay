import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import utils, { decodeHtml, imageUrl } from '../utils';
import '../../styles/postcard.less';

export default class PostCard extends Component {
  render() {
    const { post, serverIsMobile } = this.props,
          {
            featured_image,
            post_title,
            slug,
            subtitle,
            taxonomies,
          } = post,
          { category = [] } = taxonomies,
          categoryTitle = category.length && category[0];

    let image = <div />;

    if (featured_image) {
      const [width, height] = utils.metrics.isPhone(serverIsMobile) ? [1000, 750] : [2000, 1000];
      const imageSrc = imageUrl(featured_image, { width, height, quality: 35, fit: 'cover' });
      image = (
        <figure className="postcard__image--wrapper">
          <img className="postcard__image" src={imageSrc} alt={post_title} />
        </figure>
      );
    }

    return (
      <Link to={`/${slug}`}>
        <div className="postcard">
          {image}
          <header>
            <div className="postcard__category">{categoryTitle}</div>
            <h1 className="postcard__title">{decodeHtml(post_title)}</h1>
            <h2 className="postcard__subtitle">{decodeHtml(subtitle)}</h2>
            <div className="postcard__link">Read More</div>
          </header>
        </div>
      </Link>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  serverIsMobile: PropTypes.bool
};
