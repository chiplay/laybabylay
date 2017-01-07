import React, { Component } from 'react';
import { Link } from 'react-router';
import 'styles/header.less';

export default class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="header">
          <div className="navigation-wrapper container">

            <Link className="logo" to={'/'}>
              <h1>
                <span className="sr-only">Lay Baby Lay - Nursery Decor and Baby Room Ideas</span>
              </h1>
            </Link>

            <ul className="header__nav">
              <li className="header__nav-item">
                <Link to={'/about'}>About</Link>
              </li>
              <li className="header__nav-item">
                <Link to={'/studio'}>Studio</Link>
              </li>
              <li className="header__nav-item header__nav-item--home">
                <Link to={'/'}>Home</Link>
              </li>
              <li className="header__nav-item">
                <Link to={'/shop'}>Shop</Link>
              </li>
              <li className="header__nav-item header__nav-item--last">
                <Link to={'/products'}>Products</Link>
              </li>
            </ul>

            <div>
              <form action="/search" className="search-form" id="search-header-form" role="search">
                <input autoCapitalize="off" autoComplete="off" autoCorrect="off" className="search-input" id="search-input" name="query" placeholder="Search" tabIndex="1" type="search" />

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