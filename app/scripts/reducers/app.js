import { EXPAND_HEADER, SHRINK_HEADER } from '../actions';

const defaultState = {
  header: ''
};

export default function posts(state = defaultState, action) {
  switch (action.type) {
  case EXPAND_HEADER:
    return Object.assign({}, state, {
      header: ''
    });

  case SHRINK_HEADER:
    return Object.assign({}, state, {
      header: 'slim'
    });

  default: return state;
  }
}
