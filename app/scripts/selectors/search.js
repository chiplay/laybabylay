// import { createSelector } from 'reselect';

import * as fromSearch from 'reducers/search';

export function getSearchResults(state) {
  return fromSearch.getSearchResults(state.search);
}

export function getSearchQuery(state) {
  return fromSearch.getSearchQuery(state.search);
}

export function getIsSearching(state) {
  return fromSearch.getIsSearching(state.search);
}

export function getSearchTotalResults(state) {
  return fromSearch.getSearchTotalResults(state.search);
}
