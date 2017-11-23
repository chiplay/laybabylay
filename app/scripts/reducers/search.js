import {
  RECEIVE_SEARCH,
  START_FETCH_SEARCH,
  SEARCH_FETCH_ERROR,
  RECEIVE_NEXT_SEARCH
} from 'actions';

import _unionBy from 'lodash/unionBy';

const defaultState = {
  results: [],
  totalResults: 0,
  queryObj: {
    hitsPerPage: 20,
    page: 0,
    category: '',
    tag: '',
    post_type: 'posts'
  },
  isSearching: true
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
  case START_FETCH_SEARCH:
    return Object.assign({}, state, {
      queryObj: action.payload,
      isSearching: true
    });

  case RECEIVE_SEARCH:
    return Object.assign({}, state, {
      results: action.payload.hits,
      totalResults: action.payload.nbHits,
      isSearching: false
    });

  case RECEIVE_NEXT_SEARCH:
    return Object.assign({}, state, {
      results: _unionBy(state.results, action.payload.hits, 'post_id'),
      isSearching: false
    });

  case SEARCH_FETCH_ERROR:
    return Object.assign({}, state, {
      isSearching: false
    });

  default: return state;
  }
}

export function getSearchResults(state) {
  return state.results;
}

export function getSearchTotalResults(state) {
  return state.totalResults;
}

export function getSearchQuery(state) {
  return state.queryObj;
}

export function getIsSearching(state) {
  return state.isSearching;
}
