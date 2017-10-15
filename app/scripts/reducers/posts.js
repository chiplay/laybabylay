import _unionBy from 'lodash/unionBy';

import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  START_FETCH_POSTS,
  START_FETCH_POST
} from '../actions';

const defaultState = {
  posts: [],
  activePost: {},
  activeFilter: 'recent',
  page: 0,
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

  case RECEIVE_POSTS: {
    const { page, nbPages, hits } = action.payload;

    return Object.assign({}, state, {
      posts: _unionBy(state.posts, hits, 'post_id'),
      page,
      totalPages: nbPages,
      isFetching: false
    });
  }
  case RECEIVE_POST: {
    if (!action.payload.hits.length) {
      return Object.assign({}, state, {
        isFetching: false
      });
    }

    return Object.assign({}, state, {
      posts: _unionBy(state.posts, action.payload.hits, 'post_id'),
      activePost: action.payload.hits[0],
      isFetching: false
    });
  }

  default: return state;
  }

}
