import { createSelector } from 'reselect';

import * as fromPages from 'reducers/pages';

export function getPageBySlug(state, slug) {
  return fromPages.getPageBySlug(state.pages, slug);
}

export const getActiveFilter = createSelector(
  [getPageBySlug],
  (home) => home.activeFilter
);

export const getActivePosts = createSelector(
  [getPageBySlug, getActiveFilter],
  (page, activeFilter) => {
    switch (activeFilter) {
    case fromPages.RECENT_POSTS: return page.recent_posts;
    case fromPages.FAVORITE_POSTS: return page.favorite_posts;
    case fromPages.POPULAR_POSTS: return page.popular_posts;
    default: return page.recent_posts;
    }
  }
);

export const getProductCategories = createSelector(
  [getPageBySlug],
  (page) => {
    return page ? page.product_categories : [];
  }
);

export const getSearchCategories = createSelector(
  [getPageBySlug],
  (page) => {
    return page ? page.search_categories : [];
  }
);

// export function getIsFetching(state) {
//   return state.isFetching;
// }

// export function getTotalPages(state) {
//   return state.totalPages;
// }

// export function getCurrentPage(state) {
//   return state.page;
// }

// export function getActiveFilter(state) {
//   return state.activeFilter;
// }


// export const isLoggedOut = createSelector(
//   [isLoggedIn],
//   (loggedIn) => !loggedIn
// );
//
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
