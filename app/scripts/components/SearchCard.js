import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _isEqual from 'lodash/isEqual';

import utils, { decodeHtml, imageUrl } from '../utils';
import '../../styles/search-card.less';

// Dumb component
export default class SearchCard extends Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  render() {
    const { item, serverIsMobile } = this.props,
          {
            post_title,
            first_image,
            first_image_height,
            first_image_width,
            product_image,
            product_image_height,
            product_image_width,
            slug,
            link,
            vendor
          } = item,
          originalSrc = product_image || first_image,
          imageHeight = product_image_height || first_image_height,
          imageWidth = product_image_width || first_image_width,
          ratio = Math.ceil((imageHeight / imageWidth) * 100),
          imageSize = utils.metrics.isPhone(serverIsMobile) ? 300 : 500,
          imageSrc = imageUrl(originalSrc, { width: imageSize, quality: 36 });

    const cardLink = (isExternal, to, card) => {
      return isExternal ? (
        <a href={to} target="_blank" className="search-card">
          {card}
        </a>
      ) : (
        <Link to={to} className="search-card">
          {card}
        </Link>
      );
    };

    const isExternal = !!link,
          to = link || `/${slug}`;

    const card = (
      <article>
        <div className="search-card__bg">
          <div className="search-card__image-wrapper" style={{ paddingBottom: `${ratio}%` }}>
            <img className="search-card__image" data-src={imageSrc} alt={post_title} />
          </div>
        </div>

        <header className="search-card__header">
          <h5 className="search-card__title">{decodeHtml(post_title)}</h5>
          {vendor && <p className="search-card__vendor">{`Shop @ ${vendor}`}</p>}
        </header>
      </article>
    );

    return cardLink(isExternal, to, card);
  }
}


SearchCard.propTypes = {
  item: PropTypes.object.isRequired,
  serverIsMobile: PropTypes.bool
};
