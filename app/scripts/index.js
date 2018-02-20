import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
// import LogRocket from 'logrocket';

import configureStore from './store/configureStore';
import ThemeContainer from './containers/ThemeContainer';
import HomeContainer from './containers/HomeContainer';
import PostContainer from './containers/PostContainer';
import SearchContainer from './containers/SearchContainer';
import AboutPage from './components/AboutPage';
// import AboutPageContainer from './containers/AboutPageContainer';
import '../styles/app.less';

// LogRocket.init('ivtkem/lay-baby-lay-prod');
// require('logrocket-react')(LogRocket);

const store = configureStore();
const rootElement = document.getElementById('root');

// TODO: routing for search and products
// Rethink search url patterns for SEO?
//
// 'search(/)': 'search',
// 'search/:type(/)': 'search',
// 'search/:type/:query(/)': 'search',
// 'search/:type/in/:category(/)': 'search',
// 'search/:type/in/:category/:query(/)': 'search',
// 'search/:type/tagged/:tags(/)': 'searchTag',
// 'search/:type/tagged/:tags/:query(/)': 'searchTag',
// 'search/:type/in/:category/tagged/:tags(/)': 'search',
// 'search/:type/in/:category/tagged/:tags/:query(/)': 'search',
// 'products(/)' : 'search',
// 'products/:slug(/)' : 'product',
// 'page/*num(/)': 'index',
// 'about(/)': 'about',
// ':slug(/)' : 'post'

render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(useScroll())}
    >
      <Route path="/" component={ThemeContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path="about" component={AboutPage} />
        <Route path="explore" component={SearchContainer} />
        <Route path="search/:query" component={SearchContainer} />
        <Route path="explore/:post_type" component={SearchContainer} />
        <Route path="explore/:post_type/:category" component={SearchContainer} />
        <Route path="explore/:post_type/:category/:tag" component={SearchContainer} />
        <Route path="explore/:post_type/:category/:tag/:query" component={SearchContainer} />
        <Route path=":post_type/:category" component={SearchContainer} />
        <Route path=":post_type/:category/:tag" component={SearchContainer} />
        <Route path=":post_type/:category/:tag/:query" component={SearchContainer} />
        <Route path=":postSlug" component={PostContainer} />
      </Route>
    </Router>
  </Provider>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./containers/ThemeContainer', () => {
    const Theme = require('./containers/ThemeContainer').default;
    render(
      <Provider store={store}>
        <Router
          history={browserHistory}
          render={applyRouterMiddleware(useScroll())}
        >
          <Route path="/" component={Theme}>
            <IndexRoute component={HomeContainer} />
            <Route path="about" component={AboutPage} />
            <Route path="explore" component={SearchContainer} />
            <Route path="search/:query" component={SearchContainer} />
            <Route path="explore/:post_type" component={SearchContainer} />
            <Route path="explore/:post_type/:category" component={SearchContainer} />
            <Route path="explore/:post_type/:category/:tag" component={SearchContainer} />
            <Route path="explore/:post_type/:category/:tag/:query" component={SearchContainer} />
            <Route path=":post_type/:category" component={SearchContainer} />
            <Route path=":post_type/:category/:tag" component={SearchContainer} />
            <Route path=":post_type/:category/:tag/:query" component={SearchContainer} />
            <Route path=":postSlug" component={PostContainer} />
          </Route>
        </Router>
      </Provider>,
      rootElement
    );
  });
}
