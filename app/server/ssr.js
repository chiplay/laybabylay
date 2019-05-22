import 'ignore-styles';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager, __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS } from 'styled-components'

import { Provider } from 'react-redux';
import App from '../scripts/App';

module.exports = function render(store, req) {
  const context = {};
  const { StyleSheet } = __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS;
  StyleSheet.reset(true);
  const sheet = new ServerStyleSheet();

  // render the App store static markup ins content variable
  let content = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    </StyleSheetManager>
  );

  const styleTags = sheet.getStyleTags();
  sheet.seal();

  // Get a copy of store data to create the same store on client side 
  const preloadedState = store.getState();

  return { content, preloadedState, styleTags };
}