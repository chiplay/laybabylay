import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';

export const RECEIVE_PAGE = 'RECEIVE_PAGE';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERROR = 'RECEIVE_POST_ERROR';

const POSTS_PER_PAGE = 10;
const WP_URL = '/api';

function receivePage(pageName, pageData) {
  return {
    type: RECEIVE_PAGE,
    payload: {
      pageName,
      page: pageData
    }
  };
}

export function fetchPageIfNeeded(pageName) {
  return function(dispatch, getState) {
    if (shouldFetchPage(getState(), pageName)) {
      return fetch(WP_URL + '/pages?filter[name]=' + pageName)
        .then(response => response.json())
        .then(pages => dispatch(receivePage(pageName, pages[0])));
    }
  }
}

function shouldFetchPage(state, pageName) {
  const pages = state.pages;

  return !pages.hasOwnProperty(pageName);
}

export function fetchPosts(pageNum = 1) {
  return function (dispatch) {
    return fetch(WP_URL + '/posts?filter[paged]=' + pageNum + '&filter[posts_per_page]=' + POSTS_PER_PAGE)
      .then(response => Promise.all(
        [response.headers.get('X-WP-TotalPages'), response.json()]
      ))
      .then(postsData => dispatch(
        receivePosts(pageNum, postsData[0], postsData[1])
      ));
  }
}

function receivePosts(pageNum, totalPages, posts) {
  return {
    type: RECEIVE_POSTS,
    payload: {
      pageNum,
      totalPages,
      posts
    }
  };
}

const postAttrs = 'nb_links,acf,styleboard_products,subtitle,comments,comment_status,attachments,categories,colors,excerpt,related_posts,comment_count,content,date,id,slug,tags,title,type,url';

export function fetchPost(slug) {
  return function (dispatch) {
    return fetch(WP_URL + '/get_post/?post_type=post&slug=' + slug + '&include=' + postAttrs)
      .then(response => Promise.resolve(
        response.json()
      ))
      .then(postData => dispatch(
        receivePost(postData)
      ))
      .catch(err => dispatch(
        postFetchError(err)
      ));
  }
}

function receivePost(response) {
  console.log(response);
  return {
    type: RECEIVE_POST,
    payload: response
  };
}

function postFetchError(err) {
  return {
    type: RECEIVE_POST_ERROR,
    payload: err
  };
}

