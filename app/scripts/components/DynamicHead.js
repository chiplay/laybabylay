import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import _startCase from 'lodash/startCase';
import moment from 'moment';

import { imageUrl } from '../utils';

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
            excerpt,
            post_date
          } = post,
          { category = [] } = taxonomies,
          snippet = _snippetResult && _snippetResult.content.value,
          categoryTitle = category.length && category[0],
          description = (excerpt || snippet || '').replace(/<!--(.*?)-->/gmi, '').replace(/(\r\n|\n|\r)/gm, ' ');

    let imageSrc;

    if (first_image) {
      imageSrc = imageUrl(first_image, { width: 1200, quality: 90 });
    }

    if (featured_image) {
      imageSrc = imageUrl(featured_image, { width: 1200, quality: 90 });
    }

    return (
      <Helmet
        titleTemplate="%s - Lay Baby Lay"
        defaultTitle="Lay Baby Lay"
      >
        <title itemProp="name" lang="en">{_startCase(post_title)}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={`${_startCase(post_title)} - Lay Baby Lay`} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content="https://www.facebook.com/joni.h.lay" />
        <meta property="article:publisher" content="https://www.facebook.com/laybabylay" />
        <meta property="article:section" content={_startCase(categoryTitle)} />
        <meta property="article:published_time" content={moment.unix(post_date).format()} />
        <meta property="og:description" content={description} />
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
