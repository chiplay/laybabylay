import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import URI from 'urijs';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.less';
import 'styles/postcards.less';
import PostCard from 'components/PostCard';

export default class PostCards extends Component {

  buildPosts = (posts) => {
    return posts.length ? posts.map(post => {
      return (<div key={post.ID}><PostCard post={post} /></div>);
    }) : <div className="postcard__loading" />;
  }

  render() {
    const { featured } = this.props,
          { featured_image } = featured.length && featured[0];

    let imageSrc;

    if (featured_image) {
      const filename = new URI(featured_image).filename();
      imageSrc = `//res.cloudinary.com/laybabylay/image/upload/q_90,w_1200/${filename}`;
    }

    const settings = {
      dots: true,
      arrows: true,
      // className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '180px',
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
      responsive: [{
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
      }]
    };

    return (
      <div className="postcards">
        <Helmet>
          {imageSrc && <meta property="og:image" content={imageSrc} />}
        </Helmet>

        <Slider {...settings}>
          {this.buildPosts(featured)}
        </Slider>
      </div>
    );
  }
}

PostCards.propTypes = {
  featured: PropTypes.array.isRequired
};
