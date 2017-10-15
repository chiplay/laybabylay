import { RECEIVE_POSTS, RECEIVE_POST, START_FETCH_POSTS, START_FETCH_POST } from '../actions';
import * as _ from 'lodash';

const defaultState = {
  posts: [],
  activePost: {},
  pageNum: 1,
  totalPages: 1,
  isFetching: false
};

// TODO: model state for all post vs. featured post + pagination for both
// also need to model state for search and products
// How does UI state get modeled in Redux? eg. search bar active

export default function posts(state = defaultState, action) {
  switch (action.type) {
    case START_FETCH_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      });

    case START_FETCH_POST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_POSTS:
      const { page, nbPages, hits } = action.payload;

      return Object.assign({}, state, {
        posts: [...state.posts, ...hits],
        pageNum: page,
        totalPages: nbPages,
        isFetching: false
      });

    case RECEIVE_POST:
      if (!action.payload.hits.length) {
        return Object.assign({}, state, {
          isFetching: false
        });
      }

      return Object.assign({}, state, {
        posts: [...state.posts, ...action.payload.hits],
        activePost: action.payload.hits[0],
        isFetching: false
      });

    default:
      return state;
  }

}
