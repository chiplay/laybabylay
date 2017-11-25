import update from 'react-addons-update';
import _find from 'lodash/find';
import _sortBy from 'lodash/sortBy';
import _findIndex from 'lodash/findIndex';
import moment from 'moment';

import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_COMMENTS,
  RECEIVE_SEARCH,
  RECEIVE_POST_ERROR
} from 'actions';

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

  case RECEIVE_POST_ERROR: {
    const postMap = {};
    postMap[action.payload.slug] = {
      error: action.payload.error,
      content: ''
    };
    return update(state, {
      mapOfPosts: { $merge: postMap }
    });
  }

  case RECEIVE_COMMENTS: {
    const { comments, postId } = action.payload;
    const post = getPostById(state, postId);

    const sortedComments = _sortBy(comments, (comment) => {
      const { parent, date_gmt } = comment;
      let parentComment;

      if (parent) {
        parentComment = _find(comments, ['id', parent]);
        if (parentComment) {
          return moment(parentComment.date_gmt).valueOf() + 1;
        }
      }
      return moment(date_gmt).valueOf();
    });

    return update(state, {
      mapOfPosts: {
        [post.slug]: { $merge: { comments: sortedComments } }
      }
    });
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

export function getPostById(state, postId) {
  const posts = getMapOfPosts(state);
  return _find(posts, ['post_id', postId]);
}
