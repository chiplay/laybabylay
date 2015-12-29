import React, { Component } from 'react';
import SearchFilters from '../components/SearchFilters';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class LexiTheme extends Component {
  render() {
    return (
      <div className="">
        <Header />
        <SearchFilters />
        <div className="search-cover"></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-8 blog-main">
              {this.props.children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

