import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from 'reducers';
// import LogRocket from 'logrocket';

const fslogger = store => next => action => {
  let result = next(action)
  window.amplitude && window.amplitude.getInstance().logEvent(action.type, store.getState());
  return result
}

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

if (process.env.NODE_ENV === `production`) {
  middlewares.push(fslogger);
//   middlewares.push(LogRocket.reduxMiddleware());
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState = {}) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers'); // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
