import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';
import Theme from './containers/Theme';
import HomeContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';
import AboutPageContainer from './containers/AboutPageContainer';
import '../styles/app.less';

const history = new createBrowserHistory();
const store = configureStore();
let rootElement = document.getElementById('root');

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