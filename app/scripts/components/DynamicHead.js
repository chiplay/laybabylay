import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import URI from 'urijs';
import _startCase from 'lodash/startCase';

export default class DynamicHead extends Component {
  render() {
    const { post } = this.props,
          {
            first_image,
            featured_image,
            taxonomies = {},
            post_title,
            slug,
            _snippetResult,
            excerpt
          } = post,
          { category = [] } = taxonomies,
          snippet = _snippetResult && _snippetResult.content.value,
          categoryTitle = category.length && category[0];

    let imageSrc;

    if (first_image) {
      const filename = new URI(first_image).filename();
      imageSrc = `//res.cloudinary.com/laybabylay/image/upload/q_90,w_1200/${filename}`;
    }

    if (featured_image) {
      const filename = new URI(featured_image).filename();
      imageSrc = `//res.cloudinary.com/laybabylay/image/upload/q_90,w_1200/${filename}`;
    }

    return (
      <Helmet
        titleTemplate="%s - Lay Baby Lay"
        defaultTitle="Lay Baby Lay"
      >
        <title itemProp="name" lang="en">{_startCase(post_title)}</title>
        <meta name="description" content={excerpt || snippet} />

        <meta property="og:title" content={`${_startCase(post_title)} - Lay Baby Lay`} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content="https://www.facebook.com/joni.h.lay" />
        <meta property="article:publisher" content="https://www.facebook.com/laybabylay" />
        <meta property="article:section" content={_startCase(categoryTitle)} />
        <meta property="og:description" content={excerpt || snippet} />
        <meta property="og:url" content={`https://www.laybabylay.com/${slug}`} />
        <meta property="og:image" content={imageSrc} />

        <link rel="canonical" href={`https://www.laybabylay.com/${slug}`} />
      </Helmet>
    );
  }
}

DynamicHead.propTypes = {
  post: PropTypes.object
};
