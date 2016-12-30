import { RECEIVE_POSTS, RECEIVE_POST } from '../actions';

const defaultState = {
  posts: [],
  activePost: {},
  pageNum: 1,
  totalPages: 1
};

// TODO: model state for all post vs. featured post + pagination for both
// also need to model state for search and products
// How does UI state get modeled in Redux? eg. search bar active

export default function posts(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      const { query, pages, posts } = action.payload;

      return Object.assign({}, state, {
        posts: [...state.posts, ...posts],
        pageNum: parseInt(query.page),
        post: posts[0],
        totalPages: parseInt(pages)
      });

    case RECEIVE_POST:
      const { post } = action.payload;

      return Object.assign({}, state, {
        posts: [...state.posts, post],
        activePost: post
      });

    default:
      return state;
  }

}