import React, { Component } from 'react';

export default class Header extends Component {
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

            <nav id="navigation">
              <span className="right-nav">
                <button className="icon-menu">
                  <span className="hide">View Menu</span>
                </button>
              </span>
            </nav>

            <div id="search">
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