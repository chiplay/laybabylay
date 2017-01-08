import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';

export const RECEIVE_PAGE = 'RECEIVE_PAGE';
export const RECEIVE_PAGE_ERROR = 'RECEIVE_PAGE_ERROR';

export const START_FETCH_POSTS = 'START_FETCH_POSTS';
export const START_FETCH_POST = 'START_FETCH_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERROR = 'RECEIVE_POST_ERROR';

export const EXPAND_HEADER = 'EXPAND_HEADER';
export const SHRINK_HEADER = 'SHRINK_HEADER';

const POSTS_PER_PAGE = 10;
const WP_URL = '/api';
const postAttrs = 'nb_links,acf,styleboard_products,subtitle,comments,comment_status,attachments,categories,colors,excerpt,related_posts,comment_count,content,date,id,slug,tags,title,type,url,featured_image';
const pageAttrs = 'acf,excerpt,categories,featured_posts,popular_posts,favorite_posts,sidebar_tiles,content,title,subtitle,attachments,id,slug,url';

// TODO: Add "featured" posts fetching for homepage - seperate action? or parameters?

// page actions

export function fetchPage(slug) {
  return function (dispatch) {
    return fetch(WP_URL + '/get_page/?slug=' + slug + '&include=' + pageAttrs)
      .then(response => Promise.resolve(
        response.json()
      ))
      .then(pageData => dispatch(
        receivePage(pageData)
      ))
      .catch(err => dispatch(
        pageFetchError(err)
      ));
  }
}

function receivePage(response) {
  return {
    type: RECEIVE_PAGE,
    payload: response
  };
}

function pageFetchError(err) {
  return {
    type: RECEIVE_PAGE_ERROR,
    payload: err
  };
}


// posts actions

export function fetchPosts(pageNum = 1, postPerPage = POSTS_PER_PAGE) {
  return function (dispatch) {
    dispatch(startFetchPosts());

    return fetch(WP_URL + '/get_posts/?post_type=post&include=' + postAttrs + '&page=' + pageNum + '&count=' + postPerPage)
      .then(response => Promise.resolve(
        response.json()
      ))
      .then(postsData => dispatch(
        receivePosts(postsData)
      ))
      .catch(err => dispatch(
        postFetchError(err)
      ));
  }
}

function startFetchPosts() {
  return {
    type: START_FETCH_POSTS
  };
}

function receivePosts(response) {
  return {
    type: RECEIVE_POSTS,
    payload: response
  };
}

export function fetchPost(slug) {
  return function (dispatch) {
    dispatch(startFetchPost());

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

function startFetchPost() {
  return {
    type: START_FETCH_POST
  };
}

function receivePost(response) {
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


// app state actions

export function expandHeader() {
  return {
    type: EXPAND_HEADER
  };
}

export function shrinkHeader() {
  return {
    type: SHRINK_HEADER
  };
}
