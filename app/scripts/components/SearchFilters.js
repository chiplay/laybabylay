import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SearchFilters extends Component {
  render() {
    return (
      <div className="search-filters">
        <div className="filter-bar container">
          <div className="post-types">
            <a href="#" data-type="all" className="hidden-sm filter-btn">All</a>
            <a href="#" data-type="styleboard" className="filter-btn">Style Boards</a>
            <a href="#" data-type="product" className="filter-btn">Products</a>
            <a href="#" data-type="post" className="filter-btn">Posts</a>
            <div className="search-categories-region"></div>
          </div>
          <a href="#" className="color-filters colors-btn">Colors</a>
        </div>
        <div className="search-tags-region container"></div>
        <div className="search-colors-region container"></div>
      </div>
    );
  }
}