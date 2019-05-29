import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import URI from 'urijs';

import Slider from 'react-slick';
import '../../styles/postcards.less';
import PostCard from '../components/PostCard';

export default class PostCards extends Component {
  state = {
    isClient: false
  };

  componentDidMount() {
    this.setState({ isClient: true });
  }

  buildPosts = (posts, serverIsMobile) => {
    return posts.length ? posts.map(post => {
      return (<div key={post.ID}><PostCard post={post} serverIsMobile={serverIsMobile} /></div>);
    }) : <div className="postcard__loading"/>;
  }

  render() {
    const { featured, serverIsMobile } = this.props,
          { isClient } = this.state,
          { featured_image } = featured.length && featured[0];

    let imageSrc;

    if (featured_image) {
      const filename = new URI(featured_image).filename();
      imageSrc = `//res.cloudinary.com/laybabylay/image/upload/q_90,w_1200/${filename}`;
    }

    const settings = {
      dots: true,
      arrows: false,
      adaptiveHeight: true,
      lazyLoad: false,
      centerMode: true,
      infinite: true,
      centerPadding: '0',
      slidesToShow: 1,
      slidesToScroll: 1,
      key: isClient ? 'client' : 'server',
      responsive: isClient ? [{
        breakpoint: 5000,
        settings: {
          centerPadding: '180px',
          arrows: true,
          lazyLoad: true,
          adaptiveHeight: false
        }
      },{
        breakpoint: 1440,
        settings: {
          centerPadding: '85px'
        }
      }, {
        breakpoint: 1200,
        settings: {
          centerPadding: '85px'
        }
      }, {
        breakpoint: 992,
        settings: {
          arrows: false,
          autoplay: true,
          autoplaySpeed: 5000,
          adaptiveHeight: true,
          centerPadding: '0',
          lazyLoad: false
        }
      }, {
        breakpoint: 768,
        settings: {
          arrows: false,
          autoplay: true,
          autoplaySpeed: 5000,
          adaptiveHeight: true,
          centerPadding: '0',
          lazyLoad: false
        }
      }, {
        breakpoint: 576,
        settings: {
          centerPadding: '0px',
          autoplay: true,
          autoplaySpeed: 5000,
          arrows: false,
          adaptiveHeight: true,
          lazyLoad: false
        }
      }] : null
    };

    

    return (
      <div className="postcards">
        <Helmet>
          {imageSrc && <meta property="og:image" content={imageSrc} />}
        </Helmet>

        <Slider {...settings}>
          {this.buildPosts(featured, serverIsMobile)}
        </Slider>
      </div>
    );
  }
}

PostCards.propTypes = {
  featured: PropTypes.array.isRequired,
  serverIsMobile: PropTypes.bool
};
