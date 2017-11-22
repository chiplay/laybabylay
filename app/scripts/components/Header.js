import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import classNames from 'classnames';
import 'styles/header.less';

export default class Header extends Component {
  render() {
    const headerClasses = classNames('header', this.props.header);

    return (
      <div>
        <header id="header">
          <div className={headerClasses}>
            <div className="navigation-wrapper">

              <Link className="logo" to="/">
                <h1>
                  <span className="sr-only">Lay Baby Lay - Nursery Decor and Baby Room Ideas</span>
                </h1>
              </Link>

              <ul className="header__nav">
                <li className="header__nav-item">
                  <Link to="/explore/posts">Explore</Link>
                </li>
                <li className="header__nav-item header__nav-item--last">
                  <Link to="/explore/products">Joni&rsquo;s Picks</Link>
                </li>
                <li className="header__nav-item header__nav-item--home">
                  <Link to="/">Home</Link>
                </li>
                <li className="header__nav-item">
                  <Link to="https://society6.com/jonilay" target="_blank">Print Shop</Link>
                </li>
                <li className="header__nav-item">
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <Waypoint
          scrollableAncestor={window}
          topOffset="-90px"
          onEnter={this.props.expandHeader}
          onLeave={this.props.shrinkHeader}
        />
      </div>
    );
  }
}

Header.propTypes = {
  header: PropTypes.string.isRequired,
  expandHeader: PropTypes.func.isRequired,
  shrinkHeader: PropTypes.func.isRequired
};
