import '@babel/polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

const state = window.__STATE__ || {};
delete window.__STATE__;

const store = configureStore(state);
const rootElement = document.getElementById('root');

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
