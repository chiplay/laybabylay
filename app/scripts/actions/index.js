import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';

export const RECEIVE_PAGE = 'RECEIVE_PAGE';
export const RECEIVE_PAGE_ERROR = 'RECEIVE_PAGE_ERROR';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERROR = 'RECEIVE_POST_ERROR';

const POSTS_PER_PAGE = 10;
const WP_URL = '/api';
const postAttrs = 'nb_links,acf,styleboard_products,subtitle,comments,comment_status,attachments,categories,colors,excerpt,related_posts,comment_count,content,date,id,slug,tags,title,type,url';
const pageAttrs = 'acf,related_posts,content,title,subtitle,attachments,id,slug,url';


// TODO: Add "featured" posts fetching for homepage - seperate action? or parameters?

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

export function fetchPosts(pageNum = 1, postPerPage = POSTS_PER_PAGE) {
  return function (dispatch) {
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

function receivePosts(response) {
  return {
    type: RECEIVE_POSTS,
    payload: response
  };
}

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

