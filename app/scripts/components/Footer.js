import React, { Component } from 'react';
import { Link } from 'react-router';
import 'styles/footer.less';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Link className="logo" to={'/'}>
          <h1>
            <span className="sr-only">Lay Baby Lay - Nursery Decor and Baby Room Ideas</span>
          </h1>
        </Link>

        <div className="social-links">
          <a className="facebook" href="https://www.facebook.com/laybabylay" target="_blank">Facebook</a>
          <a className="pinterest" href="http://www.pinterest.com/laybabylay/" target="_blank">Pinterest</a>
          <a className="instagram-icon" href="http://instagram.com/laybabylay/" target="_blank">Instagram</a>
          <a className="bloglovin" href="http://www.bloglovin.com/blog/2302038" target="_blank">Blog Lovin</a>
          <a className="rss" href="http://feeds.feedburner.com/laybabylay/xINt" target="_blank">RSS</a>
          <a className="twitter" href="https://twitter.com/laybabylay" target="_blank">Twitter</a>
        </div>

        <div className="footer__links">
          <Link to={'/about'}>About</Link>
          <Link to={'/products'}>Products</Link>
          <a href="http://society6.com/jonilay" target="_blank">Shop</a>
        </div>

        <div className="email-signup">
          <form action="//laybabylay.us3.list-manage.com/subscribe/post?u=fdeae0ed89c10e09597447b4b&amp;id=30ae3cf548" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate="">
            <label htmlFor="mce-EMAIL">Weekly Inbox Inspiration:</label>
            <div className="field-wrapper">
              <input type="email" value="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required="" />
              <div style={{position: 'absolute', left: '-5000px'}}>
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