import { EXPAND_HEADER, SHRINK_HEADER, UPDATE_SERVER_DEVICE } from '../actions';

const defaultState = {
  header: '',
  serverIsMobile: null
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

  case UPDATE_SERVER_DEVICE:
    return Object.assign({}, state, {
      serverIsMobile: action.payload
    });

  default: return state;
  }
}
