import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { featured } = this.props;

    const settings = {
      dots: true,
      arrows: true,
      // className: 'center',
      // adaptiveHeight: true,
      centerMode: true,
      infinite: true,
      centerPadding: '100px',
      slidesToShow: 1,
      slidesToScroll: 1,
      // responsive: [{
      //   breakpoint: 1400,
      //   settings: {
      //     centerPadding: '160px'
      //   }
      // },{
      //   breakpoint: 1024,
      //   settings: {
      //     centerPadding: '110px'
      //   }
      // }, {
      //   breakpoint: 600,
      //   settings: {
      //     centerPadding: '80px'
      //   }
      // }, {
      //   breakpoint: 480,
      //   settings: {
      //     centerPadding: '20px'
      //   }
      // }]
    };

    return (
      <div className="postcards">
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
