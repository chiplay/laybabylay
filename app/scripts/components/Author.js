import React, { Component } from 'react';
import 'styles/author.less';

export default class Author extends Component {
  render() {
    return (
      <div className="author">
        <a className="headshot" href="/about" title="About Lay Baby Lay">Joni Lay</a>

        <div className="social-links">
          <a className="facebook" href="https://www.facebook.com/laybabylay" target="_blank">Facebook</a>
          <a className="pinterest" href="http://www.pinterest.com/laybabylay/" target="_blank">Pinterest</a>
          <a className="instagram-icon" href="http://instagram.com/laybabylay/" target="_blank">Instagram</a>
          <a className="bloglovin" href="http://www.bloglovin.com/blog/2302038" target="_blank">Blog Lovin</a>
          <a className="rss" href="http://feeds.feedburner.com/laybabylay/xINt" target="_blank">RSS</a>
          <a className="twitter" href="https://twitter.com/laybabylay" target="_blank">Twitter</a>
        </div>

        <div className="links">
          <a className="about-link" href="/about">about joni</a> | <a href="http://society6.com/jonilay" className="print-shop" target="_blank">print shop</a>
        </div>

        <div className="email-signup">
          <form action="//laybabylay.us3.list-manage.com/subscribe/post?u=fdeae0ed89c10e09597447b4b&amp;id=30ae3cf548" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate="">
            <label htmlFor="mce-EMAIL">weekly inbox inspiration:</label>
            <div className="field-wrapper">
              <input type="email" value="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required="" />
              <div style={{position: 'absolute', left: '-5000px'}}>
                <input type="text" name="b_fdeae0ed89c10e09597447b4b_30ae3cf548" tabIndex="-1" value="" />
              </div>
              <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}