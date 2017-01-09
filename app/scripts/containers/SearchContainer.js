import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search } from '../actions';
import Masonry from 'react-masonry-component';
import SearchCard from '../components/SearchCard';
import 'styles/search-results.less';

const masonryOptions = {
    transitionDuration: 0
};

class SearchContainer extends Component {
  componentWillMount() {
    const { search, queryObj } = this.props;
    const { keyword, post_type } = this.props.params;

    search({ ...queryObj, post_type: [post_type], search: keyword });
  }

  buildResults(results) {
    return results.map(item =>
      <SearchCard item={item} key={item.id} />
    );
  }

  componentDidUpdate() {
  }

  render() {
    const { results } = this.props;

    console.log('SearchContainer:render');

    return (
      <Masonry
        className={'search-results article-listing'}
        options={masonryOptions}
        updateOnEachImageLoad={true}
      >
        {this.buildResults(results)}
      </Masonry>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results,
    queryObj: state.search.queryObj
  };
}

export default connect(
  mapStateToProps,
  { search }
)(SearchContainer);