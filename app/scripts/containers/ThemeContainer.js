import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchFilters from '../components/SearchFilters';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { expandHeader, shrinkHeader } from '../actions';

class ThemeContainer extends Component {
  componentWillMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className="">
        <Header {...this.props} />
        <div className="search-cover"></div>
        <div className="">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.app.header,
  };
}

export default connect(
  mapStateToProps,
  { expandHeader, shrinkHeader }
)(ThemeContainer);

