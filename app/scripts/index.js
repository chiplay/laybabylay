import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';
import Theme from './containers/Theme';
import HomeContainer from './containers/HomeContainer';
import PostContainer from './containers/PostContainer';
import AboutPageContainer from './containers/AboutPageContainer';
import '../styles/app.less';

const history = new createBrowserHistory();
const store = configureStore();
let rootElement = document.getElementById('root');

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

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Theme}>
				<IndexRoute component={HomeContainer} />
				<Route path=":postSlug" component={PostContainer} />
				<Route path="about" component={AboutPageContainer} />
			</Route>
		</Router>
	</Provider>,
	rootElement
);