import update from 'react-addons-update';

import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_COMMENTS,
  RECEIVE_SEARCH
} from '../actions';

const defaultState = {
  mapOfPosts: {}
};

// TODO: model state for all post vs. featured post + pagination for both
// also need to model state for search and products
// How does UI state get modeled in Redux? eg. search bar active

export default function reducer(state = defaultState, action) {
  switch (action.type) {

  case RECEIVE_POSTS:
  case RECEIVE_SEARCH:
  case RECEIVE_POST: {
    const { postMap } = action.payload.hits.reduce(
      (blob, post) => {
        /* eslint-disable no-param-reassign, no-return-assign */
        blob.postMap[post.slug] = post;
        /* eslint-enable no-param-reassign */
        return blob;
      },
      { postMap: {} }
    );
    return update(state, {
      mapOfPosts: { $merge: postMap }
    });
  }

  case RECEIVE_COMMENTS: {
    console.log(action.payload);
    return state;
    // return update(state, {
    //   mapOfPosts: {
    //     [post.slug]: { $merge: action.payload }
    //   }
    // });
  }

  default: return state;
  }
}

export function getMapOfPosts(state) {
  return state.mapOfPosts;
}

export function getPostBySlug(state, slug) {
  return getMapOfPosts(state)[slug];
}
