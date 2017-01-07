import { RECEIVE_POSTS, RECEIVE_POST, START_FETCH_POSTS } from '../actions';
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

    case RECEIVE_POSTS:
      const { query, pages, posts } = action.payload;

      return Object.assign({}, state, {
        posts: _.unionBy(posts, state.posts, 'id'),
        pageNum: parseInt(query.page),
        post: posts[0],
        totalPages: parseInt(pages),
        isFetching: false
      });

    case RECEIVE_POST:
      const { post } = action.payload;

      return Object.assign({}, state, {
        posts: _.unionBy(posts, state.posts, 'id'),
        activePost: post,
        isFetching: false
      });

    default:
      return state;
  }

}