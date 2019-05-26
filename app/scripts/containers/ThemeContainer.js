import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { Box } from '@rebass/grid';

// import SearchFilters from '../components/SearchFilters';
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
      <ThemeProvider
        theme={{
          breakpoints: ['32em', '48em', '64em'],
          space: [ 0, 6, 12, 18, 24 ]
        }}
      >
        <Box>
          <Helmet
            titleTemplate="%s - Lay Baby Lay"
            defaultTitle="Lay Baby Lay"
          >
            <html lang="en" />
            <meta httpEquiv="content-type" content="text/html; charset=utf-8" />

            <title>Nursery Inspiration &amp; Baby Room Ideas</title>
            <meta name="description" content="Inspiration to create spaces for your little ones that are full of imagination, color, and delight and maybe find a little encouragement in this crazy but wonderful journey of having babies and watching them grow." />

            <meta property="og:title" content="Lay Baby Lay" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="Nursery Decor &amp; Baby Room Ideas" />
            <meta property="og:url" content="https://www.laybabylay.com" />
            <meta property="og:site_name" content="Lay Baby Lay" />
            <meta property="fb:app_id" content="179291298758035" />

            <link rel="canonical" href="https://www.laybabylay.com" />
          </Helmet>

          <Header {...this.props} />
          <div className="search-cover" />
          <Box pt={[0, 0, 150, 150]}>
            {this.props.children}
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
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
