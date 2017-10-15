import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import { checkStatus, parseJSON } from 'utils';
import algoliasearch from 'algoliasearch';
// import algoliasearchHelper from 'algoliasearch-helper';

const client = algoliasearch('Y488X1WEPX', '5a718b4a933cc7a657bbf4273df0d63c');

export const RECEIVE_PAGE = 'RECEIVE_PAGE';
export const RECEIVE_PAGE_ERROR = 'RECEIVE_PAGE_ERROR';

export const START_FETCH_POSTS = 'START_FETCH_POSTS';
export const START_FETCH_POST = 'START_FETCH_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERROR = 'RECEIVE_POST_ERROR';

export const EXPAND_HEADER = 'EXPAND_HEADER';
export const SHRINK_HEADER = 'SHRINK_HEADER';

export const START_FETCH_SEARCH = 'START_FETCH_SEARCH';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const SEARCH_FETCH_ERROR = 'SEARCH_FETCH_ERROR';

const POSTS_PER_PAGE = 10;
const WP_URL = '/api';
const postAttrs = 'nb_links,acf,styleboard_products,subtitle,comments,comment_status,attachments,categories,colors,excerpt,related_posts,comment_count,content,date,id,slug,tags,title,type,url,featured_image';
const pageAttrs = 'acf,excerpt,categories,featured_posts,popular_posts,favorite_posts,sidebar_tiles,content,title,subtitle,attachments,id,slug,url';
const searchAttrs = 'acf,styleboard_products,subtitle,description,link,color,vendor,price,image,related_styleboards,related_products,attachments,categories,colors,excerpt,related_posts,comment_count,comment_status,content,date,id,slug,tags,taxonomy_product_tag,taxonomy_product_type,title,type,url';

// TODO: Add "featured" posts fetching for homepage - seperate action? or parameters?

// page actions

export function fetchPage(slug) {
  return function (dispatch) {
    const pagesIndex = createAlgoliaIndex('wp_posts_page');
    pagesIndex.search({
        query: '',
        facetFilters: [`slug:${slug}`],
        attributesToHighlight: [],
        attributesToSnippet: [],
        hitsPerPage: 1
      })
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

function createAlgoliaIndex(indexName) {
   return client.initIndex(indexName);
}


// posts actions

export function fetchPosts(pageNum = 1, postPerPage = POSTS_PER_PAGE) {
  return function (dispatch) {
    dispatch(startFetchPosts());

    const postsIndex = createAlgoliaIndex('wp_posts_post');
    postsIndex.search({
        query: '',
        attributesToHighlight: [],
        attributesToSnippet: ['content:30'],
        attributesToRetrieve: [
          'post_title',
          'permalink',
          'content',
          'post_date_formatted',
          'post_id',
          'taxonomies_hierarchical',
          'taxonomies',
          'featured_image',
          'subtitle',
          'slug'
        ],
        hitsPerPage: 10,
      })
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

    const postIndex = createAlgoliaIndex('wp_posts_post');
    postIndex.search({
        query: '',
        facetFilters: [`slug:${slug}`],
        attributesToHighlight: [],
        attributesToSnippet: [],
        hitsPerPage: 1
      })
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


// search actions

export function search(queryObj = { search: 'cribs' }) {
  return function (dispatch) {
    dispatch(startFetchSearch());

    return fetch(WP_URL + '/get_search_results/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post_type: ['post','product'],
          tag: '',
          category_name: null,
          category_exclude: null,
          product_tag: '',
          product_type: null,
          paged: 1,
          posts_per_page: 20,
          search: null,
          orderby: 'rand',
          include: searchAttrs,
          ...queryObj
        })
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(searchData => dispatch(
        receiveSearch(searchData)
      ))
      .catch(err => dispatch(
        searchFetchError(err)
      ));
  }
}

function startFetchSearch() {
  return {
    type: START_FETCH_SEARCH
  };
}

function receiveSearch(response) {
  return {
    type: RECEIVE_SEARCH,
    payload: response
  };
}

function searchFetchError(err) {
  return {
    type: SEARCH_FETCH_ERROR,
    payload: err
  };
}
