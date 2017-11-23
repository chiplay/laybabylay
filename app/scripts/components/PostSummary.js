import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import utils, { decodeHtml } from 'utils';

import URI from 'urijs';
import 'styles/post-summary.less';

export default class PostSummary extends Component {

  // TODO - styles and router "Link" to single post

  render() {
    const { post } = this.props,
          {
            first_image,
            first_image_height,
            first_image_width,
            taxonomies = {},
            post_title,
            slug,
            subtitle,
            _snippetResult,
            excerpt
          } = post,
          { category = [] } = taxonomies,
          ratio = (first_image_height / first_image_width) * 100,
          snippet = _snippetResult && _snippetResult.content.value,
          categoryTitle = category.length && category[0];

    let image = <div />;

    if (first_image) {
      const imageSize = utils.metrics.isPhone ? 'w_750' : 'w_500';
      const filename = new URI(first_image).filename();
      const imageSrc = `//res.cloudinary.com/laybabylay/image/upload/f_auto,q_36,${imageSize}/${filename}`;
      image = (
        <figure className="post-summary__image--wrapper">
          <div className="post-summary__image--responsive" style={{ paddingBottom: `${ratio}%` }}>
            <img className="post-summary__image" src={imageSrc} alt={post_title} />
          </div>
        </figure>
      );
    }

    return (
      <div className="post-summary">
        <Link to={slug}>
          <div className="post-summary__bg">
            {image}
            <div className="post-summary__content">
              <div className="post-summary__meta">
                <div className="post-summary__category">{categoryTitle}</div>
              </div>
              <header>
                <h1 className="post-summary__title">{decodeHtml(post_title)}</h1>
                <h2 className="post-summary__subtitle">{decodeHtml(subtitle)}</h2>
              </header>
              <p className="post-summary__excerpt">{decodeHtml(excerpt || snippet)}</p>
              <div className="post-summary__link">Read More</div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

PostSummary.propTypes = {
  post: PropTypes.object.isRequired
};
