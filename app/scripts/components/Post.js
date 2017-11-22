import React, { Component } from 'react';
import PropTypes from 'prop-types';

import URI from 'urijs';
import moment from 'moment';
import classNames from 'classnames';
import utils, { decodeHtml, windowOptions } from 'utils';
import { FacebookButton, PinterestButton, TwitterButton } from 'react-social';
import LazyLoad from 'vanilla-lazyload';
import { Flex, Box } from 'grid-styled';

import DynamicHead from 'components/DynamicHead';
import RelatedPosts from 'components/RelatedPosts';
import Comments from 'components/Comments';
import Sidebar from 'components/Sidebar';

import 'styles/post.less';
import 'styles/share-buttons.less';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pinButtons: false
    };
  }

  componentDidMount() {
    this.lazyload = new LazyLoad();
    this.buildImagePinButtons();
  }

  componentWillReceiveProps(nextProps) {
    // If we visit a new post without unmounting the component,
    // we need to clear out the event listeners and reset state
    if (!nextProps.post && this.props.post) {
      this.buildImagePinButtons(true);
    }
  }

  componentDidUpdate() {
    this.lazyload.update();
    this.buildImagePinButtons();
  }

  componentWillUnmount() {
    this.lazyload.destroy();
    this.buildImagePinButtons(true);
  }

  buildImagePinButtons = (remove = false) => {
    if (!this.postContent || (this.state.pinButtons && !remove)) return;

    const images = this.postContent.getElementsByTagName('img');
    const method = remove ? 'removeEventListener' : 'addEventListener';
    [...images].forEach((img) => {
      // Add click handler for whole image
      img[method]('click', this.pinImage, false);
      if (remove) return;

      // wrap each image and set pre-load height styles
      const wrapper = document.createElement('div');
      wrapper.classList.add('image-wrapper');
      const ratio = (img.attributes.height.nodeValue / img.attributes.width.nodeValue) * 100;
      wrapper.setAttribute('style', `padding-bottom:${ratio}%;`);
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);

      // Add pinterest button
      const button = document.createElement('a');
      button.classList.add('pin-it-button');
      button.href = 'https://www.pinterest.com/pin/create/button/';
      button.setAttribute('data-pin-do', 'buttonPin');
      button.setAttribute('data-pin-round', true);
      button.setAttribute('data-pin-tall', true);
      button.setAttribute('data-pin-description', this.props.post.post_title);
      button.setAttribute('data-pin-media', img.src);
      button.setAttribute('data-pin-custom', true);
      img.parentNode.insertBefore(button, img.nextSibling);
    });

    if (remove) {
      this.setState({ pinButtons: false });
      return;
    }

    // Rebuild Pinterest button
    if (window.PinUtils) window.PinUtils.build();
    this.setState({ pinButtons: true });
  }

  pinImage = (img) => {
    if (!window.PinUtils) return;

    const imageSize = utils.metrics.isPhone ? 'upload/f_auto,q_36,w_700' : 'upload/f_auto,q_36,w_1200';
    const re = new RegExp(imageSize, 'g');
    const { src } = img.currentTarget;
    const media = src.replace(re, `upload/w_2000`);

    window.PinUtils.pinOne({
      url: `https://www.laybabylay.com/${this.props.post.slug}`,
      media,
      description: `${this.props.post.post_title} on LayBabyLay.com`
    });
  }

  createMarkup = (html) => {
    const imageSize = utils.metrics.isPhone ? 'w_700' : 'w_1200';
    let content = html.replace(/upload\/.+?(?=\/)/g, `upload/f_auto,q_36,${imageSize}`);
    content = content.replace(/http:/g, 'https:');
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
      post_date,
      subtitle,
      slug
      // taxonomies = {},
      // category = [],
    } = post;

    let heroImage = null;

    if (featured_image) {
      const imageSize = utils.metrics.isPhone ? 'w_800,h_400' : 'w_2400,h_1000';
      const filename = new URI(featured_image).filename();
      const imageSrc = `//res.cloudinary.com/laybabylay/image/upload/q_36,${imageSize},c_fill/${filename}`;
      heroImage = (
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

    const postClasses = classNames({ post: true, featured: !!post.featured_image });

    return (
      <Box
        width={1}
        m="auto"
        pb={20}
        px={[10, 10, 10, 40]}
        is="article"
        className={postClasses}
      >
        {heroImage}
        <Flex wrap>
          <Box width={[1, 1, 1, 2/3]}>
            <DynamicHead post={post} />

            <Box
              width={1}
              m="auto"
              pt={[30, 30, 30, 50]}
              px={[15, 15, 15, 40]}
              is="header"
              className="post__header"
            >
              <h1 className="post__title">{decodeHtml(post_title)}</h1>
              <h2 className="post__subtitle">{decodeHtml(subtitle)}</h2>

              <div className="post__meta">
                <div className="post__date">{moment.unix(post_date).format('MMM Do, YYYY')}</div>
                <div className="post__color-palette-region" />
              </div>
            </Box>

            {/* eslint-disable react/no-danger */}
            <Box
              width={1}
              m="auto"
              pt={10}
              px={[15, 15, 15, 40]}
              className="post__content"
            >
              {post.content ?
                <div
                  dangerouslySetInnerHTML={this.createMarkup(content)}
                  ref={(postContent) => { this.postContent = postContent; }}
                /> :
                <div className="spinner">
                  <div className="double-bounce1" />
                  <div className="double-bounce2" />
                </div>
              }
            </Box>
            {/* eslint-enable react/no-danger */}

            <Box
              width={1}
              m="auto"
              px={[15, 15, 15, 40]}
              className="post__extra"
            >
              <div className="categories-region" />

              <div className="addthis-region">
                <PinterestButton
                  className="pinterest-button"
                  url={`https://www.laybabylay.com/${slug}`}
                  media={shareImage}
                  windowOptions={windowOptions()}
                >
                  Pin It
                </PinterestButton>
                <FacebookButton
                  className="facebook-button"
                  url={`https://www.laybabylay.com/${slug}`}
                  appId="179291298758035"
                  windowOptions={windowOptions()}
                >
                  Share on Facebook
                </FacebookButton>
                <TwitterButton
                  className="tweet-button"
                  url={`https://www.laybabylay.com/${slug}`}
                  windowOptions={windowOptions()}
                >
                  Tweet
                </TwitterButton>
              </div>

              <Comments post={post} />
              {post.related_posts ? <RelatedPosts related={post.related_posts} /> : null}

            </Box>
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
