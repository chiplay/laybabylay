import { RECEIVE_PAGE } from '../actions';

export const DEFAULT_PAGE = 'home';

let defaultPage = {
  related_posts: []
};

let defaultState = {
  [DEFAULT_PAGE]: defaultPage
};

export default function pages(state = defaultState, action) {
  switch(action.type) {
    case RECEIVE_PAGE:
      const { page } = action.payload;

      return Object.assign({}, state, {
        [page.slug]: page
      });

    default:
      return state;
  }
}