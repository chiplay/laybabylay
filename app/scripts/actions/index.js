import 'whatwg-fetch';
import { checkStatus, parseJSON } from 'utils';
import algoliasearch from 'algoliasearch';
import _startCase from 'lodash/startCase';
import WPAPI from 'wpapi';

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

export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER';

export const START_FETCH_SEARCH = 'START_FETCH_SEARCH';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const RECEIVE_NEXT_SEARCH = 'RECEIVE_NEXT_SEARCH';
export const SEARCH_FETCH_ERROR = 'SEARCH_FETCH_ERROR';

export const START_FETCH_COMMENTS = 'START_FETCH_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';
export const START_SUBMIT_COMMENT = 'START_SUBMIT_COMMENT';
export const SUBMIT_COMMENT_SUCCESS = 'SUBMIT_COMMENT_SUCCESS';
export const SUBMIT_COMMENT_ERROR = 'SUBMIT_COMMENT_ERROR';


const POSTS_PER_PAGE = 10;

// page actions
export function fetchPage(slug) {
  return (dispatch) => {
    const pagesIndex = createAlgoliaIndex('wp_posts_page');
    pagesIndex.search({
      query: '',
      facetFilters: [`slug:${slug}`],
      attributesToHighlight: [],
      attributesToSnippet: [],
      hitsPerPage: 1
    })
      .then(pageData => dispatch(receivePage(pageData)))
      .catch(err => dispatch(pageFetchError(err)));
  };
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
export function fetchPosts(page = 0, hitsPerPage = POSTS_PER_PAGE) {
  return (dispatch) => {
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
        'post_date',
        'post_id',
        'taxonomies_hierarchical',
        'taxonomies',
        'featured_image',
        'related_posts',
        'first_image',
        'first_image_width',
        'first_image_height',
        'subtitle',
        'slug'
      ],
      page,
      hitsPerPage,
    })
      .then(postsData => dispatch(receivePosts(postsData)))
      .catch(err => dispatch(postFetchError(err)));
  };
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
  return (dispatch) => {
    dispatch(startFetchPost());

    const postIndex = createAlgoliaIndex('wp_posts_post');
    postIndex.search({
      query: '',
      facetFilters: [`slug:${slug}`],
      attributesToHighlight: [],
      attributesToSnippet: ['content:30'],
      hitsPerPage: 1
    })
      .then(postData => {
        if (!postData.hits.length) {
          return dispatch(postFetchError({ slug, error: '404 Post Not Found' }));
        }
        return dispatch(receivePost(postData));
      })
      .catch(err => dispatch(postFetchError({ slug, error: err })));
  };
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


// comments

export function fetchComments(id) {
  return (dispatch) => {
    dispatch(startFetchComments());

    const wp = new WPAPI({ endpoint: 'https://wp.laybabylay.com/wp-json' });

    wp.comments()
      .param('post', id)
      .param('orderby', 'parent')
      .param('per_page', 100)
      .then(commentData => dispatch(receiveComments(commentData, id)))
      .catch(err => dispatch(commentsFetchError(err)));
  };
}

export function submitComment(searchParams) {
  return (dispatch) => {
    dispatch(startSubmitComment());

    return fetch('https://wp.laybabylay.com/api/respond/submit_comment', {
      method: 'POST',
      body: searchParams
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch(submitCommentSuccess(response)))
      .catch(err => dispatch(submitCommentError(err)));
  };
}

function startFetchComments() {
  return {
    type: START_FETCH_COMMENTS
  };
}

function receiveComments(comments = [], postId) {
  return {
    type: RECEIVE_COMMENTS,
    payload: {
      comments,
      postId
    }
  };
}

function commentsFetchError(err) {
  return {
    type: FETCH_COMMENTS_ERROR,
    payload: err
  };
}

function startSubmitComment() {
  return {
    type: START_SUBMIT_COMMENT
  };
}

function submitCommentSuccess() {
  return {
    type: SUBMIT_COMMENT_SUCCESS
  };
}

function submitCommentError(err) {
  return {
    type: SUBMIT_COMMENT_ERROR,
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

export function setActiveFilter(filter) {
  return {
    type: SET_ACTIVE_FILTER,
    payload: filter
  };
}

// search actions

export function search(queryObj = { query: '', page: 0, hitsPerPage: 20 }) {
  return (dispatch) => {
    dispatch(startFetchSearch(queryObj));

    const searchIndex = createAlgoliaIndex('wp_searchable_posts');
    const {
      query,
      page,
      hitsPerPage,
      post_type
    } = queryObj;
    let { tag, category } = queryObj;

    const facetFilters = [];

    if (post_type) {
      facetFilters.push(`post_type_label:${_startCase(post_type)}`);
    }

    if (category) {
      category = category.replace(/-/g, ' ');
      if (post_type === 'posts') {
        facetFilters.push(`taxonomies.category:${category}`);
      } else {
        facetFilters.push(`taxonomies.product_type:${category}`);
      }
    }

    if (tag) {
      tag = tag.replace(/-/g, ' ');
      if (post_type === 'posts') {
        facetFilters.push(`taxonomies.post_tag:${tag}`);
      } else {
        facetFilters.push(`taxonomies.product_tag:${tag}`);
      }
    }

    searchIndex.search({
      query,
      hitsPerPage,
      page,
      facetFilters,
      attributesToHighlight: [],
      attributesToSnippet: [],
      attributesToRetrieve: [
        'post_title',
        'post_date',
        'post_id',
        'taxonomies',
        'featured_image',
        'first_image',
        'first_image_width',
        'first_image_height',
        'subtitle',
        'slug',
        'product_image',
        'product_image_width',
        'product_image_height',
        'vendor',
        'link'
      ],
    })
      .then(searchData => {
        if (page === 0) return dispatch(receiveSearch(searchData));
        return dispatch(receiveNextSearch(searchData));
      })
      .catch(err => dispatch(searchFetchError(err)));
  };
}

function startFetchSearch(queryObj) {
  return {
    type: START_FETCH_SEARCH,
    payload: queryObj
  };
}

function receiveSearch(response) {
  return {
    type: RECEIVE_SEARCH,
    payload: response
  };
}

function receiveNextSearch(response) {
  return {
    type: RECEIVE_NEXT_SEARCH,
    payload: response
  };
}

function searchFetchError(err) {
  return {
    type: SEARCH_FETCH_ERROR,
    payload: err
  };
}
