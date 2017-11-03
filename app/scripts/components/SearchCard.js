import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _isEqual from 'lodash/isEqual';
// import LazyLoad from 'vanilla-lazyload';

import { decodeHtml } from 'utils';
import URI from 'urijs';
import 'styles/search-card.less';

// Dumb component
export default class SearchCard extends Component {
  componentDidMount() {
    // this.lazyload = new LazyLoad();
  }

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  componentDidUpdate() {
    // this.lazyload.update();
  }

  componentWillUnmount() {
    // this.lazyload.destroy();
  }

  render() {
    const { item } = this.props,
          {
            post_title,
            first_image,
            product_image,
            slug
          } = item,
          originalSrc = product_image || first_image,
          filename = originalSrc ? new URI(originalSrc).filename() : null,
          imageSrc = filename ? `//res.cloudinary.com/laybabylay/image/upload/q_40,w_500/${filename.replace(/\.[^/.]+$/, '')}.jpg` : null;

    return (
      <Link to={`/${slug}`} className="search-card">
        <article>

          <div className="search-card__bg">
            <img className="search-card__image" src={imageSrc} alt={post_title} />
          </div>

          <header className="search-card__header">
            <h5 className="search-card__title">{decodeHtml(post_title)}</h5>
          </header>

        </article>
      </Link>
    );
  }
}


SearchCard.propTypes = {
  item: PropTypes.object.isRequired,
};
