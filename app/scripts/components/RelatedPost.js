import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { decodeHtml, imageUrl } from '../utils';
import '../../styles/related-post.less';

// Dumb component
export default class RelatedPost extends Component {
  render() {
    const { post } = this.props,
          {
            post_title,
            first_image,
            product_image,
            slug
          } = post,
          originalSrc = product_image || first_image,
          imageSrc = imageUrl(originalSrc, { width: 500, height: 800, quality: 36, fit: 'cover' });

    return (
      <Link to={`/${slug}`} className="related-post">
        <article>

          <div className="related-post__bg">
            <img className="related-post__image" src={imageSrc} alt={post_title} />
          </div>

          <header className="related-post__header">
            <h5 className="related-post__title">{decodeHtml(post_title)}</h5>
          </header>

        </article>
      </Link>
    );
  }
}


RelatedPost.propTypes = {
  post: PropTypes.object.isRequired,
};
