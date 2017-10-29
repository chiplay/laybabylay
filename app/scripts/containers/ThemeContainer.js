import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import SearchFilters from '../components/SearchFilters';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { expandHeader, shrinkHeader } from 'actions';

class ThemeContainer extends Component {
  componentWillMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className="">
        <Header {...this.props} />
        <div className="search-cover" />
        <div className="">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

ThemeContainer.propTypes = {
  children: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    header: state.app.header,
  };
}

export default connect(
  mapStateToProps,
  { expandHeader, shrinkHeader }
)(ThemeContainer);
