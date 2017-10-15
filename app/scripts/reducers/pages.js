import { RECEIVE_PAGE } from '../actions';

export const DEFAULT_PAGE = 'home';

const defaultPage = {
  featured_posts: [],
  popular_posts: [],
  favorite_posts: [],
  sidebar_tiles: []
};

const defaultState = {
  [DEFAULT_PAGE]: defaultPage
};

export default function pages(state = defaultState, action) {
  switch (action.type) {
  case RECEIVE_PAGE: {
    const { hits } = action.payload,
          page = hits[0];

    return Object.assign({}, state, {
      [page.slug]: page
    });
  }

  default: return state;
  }
}
