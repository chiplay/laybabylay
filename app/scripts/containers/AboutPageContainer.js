import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import AboutPage from 'components/AboutPage';
import { fetchPage } from 'actions';

const PAGE_NAME = 'about';

// Smart component
class AboutPageContainer extends Component {
  componentWillMount() {
    const { fetchPage } = this.props;
    fetchPage(PAGE_NAME);
  }

  render() {
    const { page } = this.props;
    return <AboutPage />;
  }
}

function mapStateToProps(state) {
  const page = state.pages[PAGE_NAME] || state.pages[DEFAULT_PAGE];

  return {
    page: page
  };
}
// We need to connect it to Redux store
export default connect(
    mapStateToProps,
    { fetchPage }
)(AboutPageContainer);
