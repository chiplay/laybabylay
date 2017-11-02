import React, { Component } from 'react';
import { Link } from 'react-router';
import 'styles/author.less';

export default class Author extends Component {
  render() {
    return (
      <div className="author">
        <Link className="headshot" to="/about" title="About Lay Baby Lay">About Joni</Link>

        <div className="social-links">
          <a className="facebook" href="https://www.facebook.com/laybabylay" target="_blank">Facebook</a>
          <a className="pinterest" href="http://www.pinterest.com/laybabylay/" target="_blank">Pinterest</a>
          <a className="instagram-icon" href="http://instagram.com/laybabylay/" target="_blank">Instagram</a>
          <a className="bloglovin" href="http://www.bloglovin.com/blog/2302038" target="_blank">Blog Lovin</a>
          <a className="rss" href="http://feeds.feedburner.com/laybabylay/xINt" target="_blank">RSS</a>
          <a className="twitter" href="https://twitter.com/laybabylay" target="_blank">Twitter</a>
        </div>

      </div>
    );
  }
}
