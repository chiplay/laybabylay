import React, { Component } from 'react';
import { Link } from 'react-router';
import 'styles/footer.less';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Link className="logo" to="/">
          <h1>
            <span className="sr-only">Lay Baby Lay - Nursery Decor and Baby Room Ideas</span>
          </h1>
        </Link>

        <div className="social-links">
          <a className="instagram-icon" href="https://instagram.com/laybabylay/">Instagram</a>
          <a className="pinterest" href="https://www.pinterest.com/laybabylay/">Pinterest</a>
          <a className="facebook" href="https://www.facebook.com/laybabylay">Facebook</a>
          <a className="bloglovin" href="https://www.bloglovin.com/blog/2302038">Blog Lovin</a>
          <a className="rss" href="https://feeds.feedburner.com/laybabylay/xINt">RSS</a>
          <a className="twitter" href="https://twitter.com/laybabylay">Twitter</a>
        </div>

        <div className="footer__links">
          <Link to="/about">About</Link>
          <a href="mailto:joni@laybabylay.com">Contact Me</a>
          <Link to="/explore/posts">Archives</Link>
          <Link to="/explore/products">Products</Link>
          <a href="https://society6.com/jonilay">Print Shop</a>
        </div>

        <div className="email-signup">
          <form action="//laybabylay.us3.list-manage.com/subscribe/post?u=fdeae0ed89c10e09597447b4b&amp;id=30ae3cf548" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate="">
            <label htmlFor="mce-EMAIL">Weekly Inbox Inspiration:</label>
            <div className="field-wrapper">
              <input type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required="" />
              <div style={{ position: 'absolute', left: '-5000px' }}>
                <input type="text" name="b_fdeae0ed89c10e09597447b4b_30ae3cf548" tabIndex="-1" value="" />
              </div>
              <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
            </div>
          </form>
        </div>

        <div className="footer-legal">
          <small>Copyright Lay Baby Lay</small>
        </div>
      </footer>
    );
  }
}
