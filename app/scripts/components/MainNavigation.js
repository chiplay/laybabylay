import React, { Component } from 'react';
import { Link } from 'react-router';

export default class MainNavigation extends Component {
  render() {
    return (
      <header id="header">
        <div className="header">
          <div className="navigation-wrapper container">

            <h1 id="logo">
              <a href="/">
                <span className="sr-only">Lay Baby Lay - Nursery Decor and Baby Room Ideas</span>
              </a>
            </h1>

            <div id="about-widget">
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
                      <input type="text" name="b_fdeae0ed89c10e09597447b4b_30ae3cf548" tabindex="-1" value="" />
                    </div>
                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
                  </div>
                </form>
              </div>
            </div>

            <nav id="navigation">
              <span className="right-nav">
                <button className="icon-menu">
                  <span className="hide">View Menu</span>
                </button>
              </span>
            </nav>

            <div id="search">
              <form action="/search" className="search-form" id="search-header-form" role="search" onsubmit="return false;">
                <input autocapitalize="off" autocomplete="off" autocorrect="off" className="search-input" id="search-input" name="query" placeholder="Search" tabindex="1" type="search" />

                <button className="icon-search search-show">
                  <span className="hide">Search</span>
                </button>

                <button className="icon-close search-clear">
                  <span className="hide">Clear</span>
                </button>

                <div className="load-indicator">
                  <div className="circle-1"></div>
                  <div className="circle-2"></div>
                  <span className="hide">Loading</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    );
  }
}