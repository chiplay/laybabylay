import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router';

import PostCard from '../components/PostCard';
import 'slick-carousel/slick/slick.less';
import 'styles/postcards.less';

export default class PostCards extends Component {

  buildPosts(posts) {
    return posts.length ? posts.map(post =>
      <div key={post.id}><PostCard post={post} /></div>
    ) : <div className="postcard__loading"></div>;
  }

  render() {
    const { featured, totalPages, pageNum = 1 } = this.props;

    let settings = {
      dots: true,
      arrows: true,
      // className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '200px',
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1400,
        settings: {
          centerPadding: '160px'
        }
      },{
        breakpoint: 1024,
        settings: {
          centerPadding: '110px'
        }
      }, {
        breakpoint: 600,
        settings: {
          centerPadding: '80px'
        }
      }, {
        breakpoint: 480,
        settings: {
          centerPadding: '20px'
        }
      }]
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