import { createSelector } from 'reselect';
import _find from 'lodash/find';

import * as fromPosts from 'reducers/posts';

export function getMapOfPosts(state) {
  return fromPosts.getMapOfPosts(state.posts);
}

export function getPostBySlug(state, slug) {
  return fromPosts.getPostBySlug(state.posts, slug);
}

export const getPostById = createSelector(
  [getMapOfPosts, (state, props) => props],
  (posts, { postId }) => _find(posts, ['post_id', postId])
);


// export function getUserProfile(state) {
//   return fromAuth.getUserProfile(state.auth);
// }
//
// export function getTokens(state) {
//   return fromAuth.getTokens(state.auth);
// }
//
// export function isUpdateTokenInProgress(state) {
//   return fromAuth.isUpdateTokenInProgress(state.auth);
// }
//
// export const getAuthUserId = createSelector(
//   [getUserProfile],
//   (userProfile) => {
//     return (userProfile) ? userProfile.userId : null;
//   }
// );
//
// export const getIdToken = createSelector(
//   [getTokens],
//   (tokens) => tokens.idToken
// );
//
// export const getRefreshToken = createSelector(
//   [getTokens],
//   (tokens) => tokens.refreshToken
// );
//
// export const isImpersonated = createSelector(
//   [getUserProfile],
//   (userProfile) => userProfile.impersonated
// );
