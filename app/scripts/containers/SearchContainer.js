import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Masonry from 'react-masonry-component';
import Waypoint from 'react-waypoint';
import _isEqual from 'lodash/isEqual';

import { search } from 'actions';
import { getSearchResults, getIsSearching, getSearchQuery } from 'selectors';

import SearchCard from 'components/SearchCard';
import 'styles/search-results.less';

const masonryOptions = {
  transitionDuration: 0
};

class SearchContainer extends Component {
  componentWillMount() {
    const { actions, params, queryObj } = this.props,
          { post_type, query } = params;

    actions.search({ ...queryObj, post_type: [post_type], query });
  }

  componentWillReceiveProps(nextProps) {
    const { actions, params } = this.props,
          { params: nextParams, queryObj: nextQueryObj } = nextProps;

    // Only trigger a new search here on route change (post_type or query?)
    if (!_isEqual(params, nextParams)) {
      actions.search({
        ...nextQueryObj,
        post_type: [nextParams.post_type],
        query: nextParams.query
      });
    }
  }

  fetchMoreResults = (props) => {
    const { queryObj, actions } = props;
    actions.search({
      ...queryObj,
      page: queryObj.page + 1
    });
  }

  buildResults = (results) => {
    return results.map(item => <SearchCard item={item} key={item.post_id} />);
  }

  render() {
    const { results, isSearching } = this.props;

    if (!results.length) {
      return (
        <div>No results</div>
      );
    }

    if (isSearching) {
      return (
        <article className="post">
          <div className="spinner">
            <div className="double-bounce1" />
            <div className="double-bounce2" />
          </div>
        </article>
      );
    }

    return (
      <div className="search">
        <Masonry
          className="search-results article-listing"
          options={masonryOptions}
          updateOnEachImageLoad
        >
          {this.buildResults(results)}
        </Masonry>
        <Waypoint
          scrollableAncestor={window}
          bottomOffset="-400px"
          onEnter={() => this.fetchMoreResults(this.props)}
        />
      </div>
    );
  }
}

SearchContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  queryObj: PropTypes.object.isRequired,
  isSearching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    results: getSearchResults(state),
    queryObj: getSearchQuery(state),
    isSearching: getIsSearching(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      search
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
