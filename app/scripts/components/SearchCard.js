import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _isEqual from 'lodash/isEqual';

import { decodeHtml } from 'utils';
import URI from 'urijs';
import 'styles/search-card.less';

// Dumb component
export default class SearchCard extends Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  render() {
    const { item } = this.props,
          {
            post_title,
            first_image,
            product_image,
            slug,
            link,
            vendor
          } = item,
          originalSrc = product_image || first_image,
          filename = originalSrc ? new URI(originalSrc).filename() : null,
          imageSrc = filename ? `//res.cloudinary.com/laybabylay/image/upload/q_40,w_500/${filename.replace(/\.[^/.]+$/, '')}.jpg` : null;

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
          <img className="search-card__image" src={imageSrc} alt={post_title} />
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
};
