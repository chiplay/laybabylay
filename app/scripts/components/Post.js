import React, { Component } from 'react';
import PropTypes from 'prop-types';

import URI from 'urijs';
import moment from 'moment';
import classNames from 'classnames';
import { decodeHtml } from 'utils';
import { FacebookButton, PinterestButton, TwitterButton } from 'react-social';
import LazyLoad from 'vanilla-lazyload';
import { Flex, Box } from 'grid-styled';

import DynamicHead from 'components/DynamicHead';
import Comments from 'components/Comments';
import Sidebar from 'components/Sidebar';

import 'styles/post.less';
import 'styles/share-buttons.less';

export default class Post extends Component {

  componentDidMount() {
    this.lazyload = new LazyLoad();
  }

  componentDidUpdate() {
    this.lazyload.update();
  }

  componentWillUnmount() {
    this.lazyload.destroy();
  }

  createMarkup = (html) => {
    let content = html.replace(/upload\/v/g, 'upload/f_auto,q_95,w_1200/v');
    content = content.replace(/src=/ig, 'data-original=');
    return {
      __html: content
    };
  }

  // TODO - related post and comments, social buttons logic (actions?)

  render() {
    const { post, sidebarTiles } = this.props;

    if (!post) {
      return (
        <article className="post">
          <div className="spinner">
            <div className="double-bounce1" />
            <div className="double-bounce2" />
          </div>
        </article>
      );
    }

    const {
      content,
      featured_image,
      first_image,
      post_title,
      date,
      subtitle,
      slug
      // taxonomies = {},
      // category = [],
    } = post;

    const postClasses = classNames({ post: true, featured: !!post.featured_image });

    let image = null;

    if (featured_image) {
      const filename = new URI(featured_image).filename();
      const imageSrc = `//res.cloudinary.com/laybabylay/image/upload/q_30,w_2400,h_1000,c_fill/${filename}`;
      image = (
        <div className="post__featured-image--wrapper">
          <img className="post__featured-image" src={imageSrc} alt={post_title} />
        </div>
      );
    }

    let shareImage;

    if (first_image) {
      const filename = new URI(first_image).filename();
      shareImage = `//res.cloudinary.com/laybabylay/image/upload/q_90,w_1200/${filename}`;
    }

    return (

      <Box width={1} is="article" mx="auto" className={postClasses}>
        {image}

        <Flex wrap>
          <Box width={[1, 1, 1, 2/3]}>
            <DynamicHead post={post} />

            <header className="align-center">
              <h1 className="title">{decodeHtml(post_title)}</h1>
              <h2 className="subtitle">{decodeHtml(subtitle)}</h2>

              <div className="meta">
                <div className="date">{moment(date).format('MMM Do, YYYY')}</div>
                <div className="color-palette-region" />
              </div>
            </header>

            {/* eslint-disable react/no-danger */}
            <div className="content" dangerouslySetInnerHTML={this.createMarkup(content)} />
            {/* eslint-enable react/no-danger */}

            <div className="categories-region" />

            <div className="addthis-region">
              <PinterestButton
                className="pinterest-button"
                url={`https://www.laybabylay.com/${slug}`}
                media={shareImage}
              >
                Pin It
              </PinterestButton>
              <FacebookButton
                className="facebook-button"
                url={`https://www.laybabylay.com/${slug}`}
                appId="179291298758035"
              >
                Share on Facebook
              </FacebookButton>
              <TwitterButton
                className="tweet-button"
                url={`https://www.laybabylay.com/${slug}`}
              >
                Tweet
              </TwitterButton>
            </div>

            <Comments post={post} />
            <div className="related-posts-region" />
          </Box>

          <Sidebar tiles={sidebarTiles} />
        </Flex>
      </Box>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object,
  sidebarTiles: PropTypes.array
};
