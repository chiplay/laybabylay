import { RECEIVE_SEARCH, START_FETCH_SEARCH, SEARCH_FETCH_ERROR } from '../actions';
import * as _ from 'lodash';

const defaultState = {
  results: [],
  queryObj: {},
  isSearching: false
};

export default function posts(state = defaultState, action) {
  switch (action.type) {
    case START_FETCH_SEARCH:
      return Object.assign({}, state, {
        isSearching: true
      });

    case RECEIVE_SEARCH:
      const { posts } = action.payload;

      return Object.assign({}, state, {
        results: _.unionBy(state.results, posts, 'id'),
        isSearching: false
      });

    case SEARCH_FETCH_ERROR:
      return Object.assign({}, state, {
        isSearching: false
      });

    default:
      return state;
  }
}