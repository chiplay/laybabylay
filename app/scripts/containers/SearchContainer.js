import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Masonry from 'react-masonry-component';
import Waypoint from 'react-waypoint';
import { Helmet } from 'react-helmet';
import _isEqual from 'lodash/isEqual';
import { Flex, Box } from 'grid-styled';
import classNames from 'classnames';
import LazyLoad from 'vanilla-lazyload';
import _startCase from 'lodash/startCase';

import { search, fetchPage } from 'actions';
import {
  getSearchResults,
  getIsSearching,
  getSearchQuery,
  getPageBySlug,
  getProductCategories,
  getSearchCategories,
  getSearchTotalResults
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
    } = this.props;

    if (!searchPage) actions.fetchPage('search');

    actions.search({
      ...queryObj,
      ...params,
      ...!params.query && { query: '' },
      ...!params.category && { category: '' },
      page: 0
    });
  }

  componentDidMount() {
    this.lazyload = new LazyLoad();
  }

  componentWillReceiveProps(nextProps) {
    const { actions, params } = this.props,
          { params: nextParams, queryObj: nextQueryObj } = nextProps;

    // Only trigger a new search here on route change (post_type or query?)
    if (!_isEqual(params, nextParams)) {
      actions.search({
        ...nextQueryObj,
        ...nextParams,
        ...!nextParams.query && { query: '' },
        ...!nextParams.category && { category: '' },
        page: 0
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props.results, nextProps.results) ||
      !_isEqual(this.props.isSearching, nextProps.isSearching);
  }

  componentDidUpdate() {
    this.lazyload.update();
  }

  componentWillUnmount() {
    this.lazyload.destroy();
  }

  fetchMoreResults = (props) => {
    const {
      queryObj,
      actions,
      results,
      totalResults
    } = props;
    if (results.length === totalResults) return;

    actions.search({
      ...queryObj,
      page: queryObj.page + 1
    });
  }

  buildResults = (results) => {
    return results.map(item => <SearchCard item={item} key={item.post_id} />);
  }

  toggleFilter(filter) {
    const { queryObj } = this.props;
    const path = `/explore/${queryObj.post_type}/${filter.name.replace(/\s/g, '-')}`;
    browserHistory.push(path);
  }

  renderFilters = (filters, category) => {
    return filters.map(filter => {
      const active = category === filter.name.replace(/\s/g, '-');
      const filterClasses = classNames('tag-btn', { active });
      return (
        <Box
          is="button"
          className={filterClasses}
          key={filter.term_id}
          onClick={() => this.toggleFilter(filter)}
        >
          {filter.name}
        </Box>
      );
    });
  }

  render() {
    const {
            results,
            isSearching,
            productCategories,
            searchCategories,
            queryObj,
            totalResults,
            params
          } = this.props,
          { post_type } = params;

    const filters = post_type === 'products' ? productCategories : searchCategories;

    // Make selector from queryObj
    let resultsTitle = totalResults;
    resultsTitle += (queryObj.post_type === 'posts') ? ' Post' : ' Product';
    if (results.length !== 1) resultsTitle += 's';
    if (queryObj.query) resultsTitle += ` for "${queryObj.query}"`;
    if (queryObj.category) resultsTitle += ` in "${_startCase(queryObj.category.replace(/-/g, ' '))}"`;
    if (queryObj.tag) resultsTitle += ` tagged "${_startCase(queryObj.tag.replace(/-/g, ' '))}"`;

    return (
      <div className="search">
        <Helmet
          titleTemplate="%s - Lay Baby Lay"
          defaultTitle="Lay Baby Lay"
        >
          <title itemProp="name" lang="en">{_startCase(resultsTitle)}</title>
          <meta property="og:title" content={`${_startCase(resultsTitle)} - Lay Baby Lay`} />
          <meta property="og:url" content={window.location.href} />
          <link rel="canonical" href={window.location.href} />
        </Helmet>
        <Flex className="search-filters category-list">
          {this.renderFilters(filters, queryObj.category)}
        </Flex>
        <Flex className="search-results-title">
          {resultsTitle}
        </Flex>
        <Masonry
          className="search-results article-listing"
          options={masonryOptions}
          updateOnEachImageLoad
        >
          {this.buildResults(results)}
        </Masonry>
        {isSearching ?
          <article className="post">
            <div className="spinner">
              <div className="double-bounce1" />
              <div className="double-bounce2" />
            </div>
          </article> : null
        }
        <Waypoint
          scrollableAncestor={window}
          bottomOffset="-100px"
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
  totalResults: PropTypes.number.isRequired,
  searchCategories: PropTypes.array,
  productCategories: PropTypes.array,
  queryObj: PropTypes.object.isRequired,
  isSearching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    productCategories: getProductCategories(state, 'search'),
    searchCategories: getSearchCategories(state, 'search'),
    totalResults: getSearchTotalResults(state),
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
