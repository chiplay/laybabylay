import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router';

import PostCard from '../components/PostCard';
import 'slick-carousel/slick/slick.less';
import 'styles/postcards.less';

export default class PostCards extends Component {

  buildPosts(posts) {
    return posts.map(post =>
      <div key={post.id}><PostCard post={post} /></div>
    );
  }

  handlePaginationClick(pageNum) {
    console.log('pagination clicked');
    // scroll(0, 0);
    this.props.fetchPosts(pageNum);
  }

  buildPagination(pageNum, totalPages) {
    const prevText = 'Previous';
    const nextText = 'Next';

    let prevLink = {
      link: <a>{prevText}</a>,
      enabled: false
    };

    let nextLink = {
      link: <Link to={'/' + (pageNum + 1)} onClick={() => this.handlePaginationClick(pageNum + 1)}>{nextText}</Link>,
      enabled: true
    };

    if (pageNum > 1 && pageNum < totalPages) {
      prevLink.link = <Link to={'/' + (pageNum - 1)} onClick={() => this.handlePaginationClick(pageNum - 1)}>{prevText}</Link>;
      prevLink.enabled = true;
    } else if (pageNum == totalPages) {
      nextLink.link = <a>{nextText}</a>;
      nextLink.enabled = false;

      prevLink.link = <Link to={'/' + (pageNum - 1)} onClick={() => this.handlePaginationClick(pageNum - 1)}>{prevText}</Link>;
      prevLink.enabled = true;
    }

    return (
      <div />
    );

    // return (
    //   <nav>
    //     <ul className="pager">
    //       {[prevLink, nextLink].map((link, index) =>
    //         <li key={index} className={link.enabled ? '' : 'disabled'}>
    //           {link.link}
    //         </li>
    //       )}
    //     </ul>
    //   </nav>
    // );
  }

  render() {
    const { featured, totalPages, pageNum = 1 } = this.props;

    let settings = {
      dots: false,
      // className: 'center',
      // centerMode: true,
      infinite: true,
      // centerPadding: '60px',
      slidesToShow: 5,
      slidesToScroll: 3,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
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
    //        {this.buildPagination(parseInt(pageNum), totalPages)}
  }
}