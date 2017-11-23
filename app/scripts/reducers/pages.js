import _unionBy from 'lodash/unionBy';
import {
  RECEIVE_PAGE,
  RECEIVE_POSTS,
  START_FETCH_POSTS,
  START_FETCH_POST,
  SET_ACTIVE_FILTER
} from '../actions';

export const DEFAULT_PAGE = 'home';
export const RECENT_POSTS = 'recent';
export const FAVORITE_POSTS = 'favorite';
export const POPULAR_POSTS = 'popular';

const defaultPage = {
  featured_posts: [], // hero
  recent_posts: [],
  popular_posts: [],
  favorite_posts: [],
  sidebar_tiles: [],
  activeFilter: 'recent',
  page: 0,
  totalPages: 1,
  isFetching: false,
  slug: 'home'
};

const defaultState = {
  [DEFAULT_PAGE]: defaultPage
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
  case RECEIVE_PAGE: {
    const { hits } = action.payload,
          page = hits[0];

    return Object.assign({}, state, {
      [page.slug]: {
        ...state[page.slug],
        ...page
      }
    });
  }

  case START_FETCH_POSTS:
    return Object.assign({}, state, {
      home: {
        ...state.home,
        isFetching: true
      }
    });

  case SET_ACTIVE_FILTER:
    return Object.assign({}, state, {
      home: {
        ...state.home,
        activeFilter: action.payload,
        isFetching: false
      }
    });

  case START_FETCH_POST:
    return Object.assign({}, state, {
      home: {
        ...state.home,
        isFetching: true
      }
    });

  case RECEIVE_POSTS: {
    const { page, nbPages, hits } = action.payload;

    return Object.assign({}, state, {
      home: {
        ...state.home,
        recent_posts: _unionBy(state.home.recent_posts, hits, 'post_id'),
        page,
        totalPages: nbPages,
        isFetching: false
      }
    });
  }

  default: return state;
  }
}

export function getMapOfPages(state) {
  return state;
}

export function getPageBySlug(state, slug) {
  return getMapOfPages(state)[slug];
}
