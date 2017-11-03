import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Masonry from 'react-masonry-component';
import Waypoint from 'react-waypoint';
import _isEqual from 'lodash/isEqual';
import { Flex, Box } from 'grid-styled';

import { search, fetchPage } from 'actions';
import {
  getSearchResults,
  getIsSearching,
  getSearchQuery,
  getPageBySlug,
  getProductCategories,
  getSearchCategories
} from 'selectors';

import SearchCard from 'components/SearchCard';
import 'styles/search-results.less';
import 'styles/filters.less';
import 'styles/tags.less';

const masonryOptions = {
  transitionDuration: 0
};

class SearchContainer extends Component {
  componentWillMount() {
    const {
            actions,
            params,
            queryObj,
            searchPage
          } = this.props,
          { post_type, query } = params;

    if (!searchPage) actions.fetchPage('search');
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

  renderFilters = (filters) => {
    return filters.map(filter => {
      return (
        <Box is="button" className="tag-btn" key={filter.term_id}>{filter.name}</Box>
      );
    });
  }

  render() {
    const {
            results,
            isSearching,
            productCategories,
            searchCategories,
            params
          } = this.props,
          { post_type } = params;

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

    const filters = post_type === 'posts' ? searchCategories : productCategories;

    // Make selector from queryObj
    // var str = values[1],
    //     data = this.model.defaultData;
    // // if (values[0] < values[1]) str += ' of ' + values[1];
    // str += ' Result';
    // if (values[2]) return 'Searching...';
    // if (values[0] !== 1) str += 's';
    // if (data.search) str += ' for "' + data.search + '"';
    // if (data.category) str += ' in "' + data.category + '"';
    // if (data.product_type) str += ' in "' + data.product_type + '"';
    // if (data.product_tags) str += ' tagged "' + data.product_tags.replace(/\,/g,', ') + '"';
    // if (data.tags) str += ' tagged "' + data.tags.replace(/\,/g,', ') + '"';
    // return str;

    return (
      <div className="search">
        <Flex className="search-filters">
          {this.renderFilters(filters)}
        </Flex>
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
  searchPage: PropTypes.object,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  searchCategories: PropTypes.array,
  productCategories: PropTypes.array,
  queryObj: PropTypes.object.isRequired,
  isSearching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    productCategories: getProductCategories(state, 'search'),
    searchCategories: getSearchCategories(state, 'search'),
    results: getSearchResults(state),
    queryObj: getSearchQuery(state),
    isSearching: getIsSearching(state),
    searchPage: getPageBySlug(state, 'search')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      search,
      fetchPage
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
