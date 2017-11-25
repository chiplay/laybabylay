import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import _startCase from 'lodash/startCase';
import 'styles/about.less';

// Dumb component
export default class AboutPage extends Component {
  // createMarkup(html) {
  //   return {
  //     __html: html
  //   }
  // }

  render() {
    // const { page } = this.props;
    const description = 'Lay Baby Lay is my creative outlet and the place where I am able to express all the ideas running around in my head.  It is my hope that you will also be inspired to create spaces for your little ones that are full of imagination, color, and delight.';
    return (
      <div className="about">
        <Helmet>
          <title itemProp="name" lang="en">About Lay Baby Lay</title>
          <meta name="description" content={description} />
          <meta property="og:title" content="About Lay Baby Lay" />
          <meta property="og:description" content={description} />
          <meta property="og:url" content="https://www.laybabylay.com/about" />
          <meta property="og:image" content="https://res.cloudinary.com/laybabylay/image/upload/q_40/about_rnuilh.jpg" />
          <link rel="canonical" href="https://www.laybabylay.com/about" />
        </Helmet>
        <h1 className="align-center">About Lay Baby Lay</h1>
        <div className="about-image">
          <img data-pin-no-hover="true" src="https://res.cloudinary.com/laybabylay/image/upload/q_40/about_rnuilh.jpg" alt="Joni & Vivi" />
        </div>

        <div className="about-copy">
          <p className="lead">Lay Baby Lay started in 2011 shortly after the arrival of my first baby as a place to provide fresh and unique nursery inspiration with a little dose of motherhood experience.</p>
          <p>This site is my creative outlet and the place where I am able to express all the ideas running around in my head.  It is my hope that you will also be inspired to create spaces for your little ones that are full of imagination, color, and delight and maybe find a little encouragement in this crazy but wonderful journey of having babies and watching them grow.</p>
          <p>If you have questions about sponsored posts or giveaways, please <a href="mailto:joni@laybabylay.com">email me</a> for more information.  I am happy to consider them if the products are consistent with those I frequently feature and if they fit within the content and feel of Lay Baby Lay.</p>
          <p>I do not accept ads at this time, but please note I do use affiliate links where I can.  This means I earn a small commission from products purchased directly through these links from Lay Baby Lay.  This does not in any way affect or compromise the choices I make when curating products, but it is a way to help support my growing family while doing what I love and offset the costs of maintaining this blog.</p>
        </div>
      </div>
    );
  }
}
