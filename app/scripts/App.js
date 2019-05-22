import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ThemeContainer from './containers/ThemeContainer';
import HomeContainer from './containers/HomeContainer';
import PostContainer from './containers/PostContainer';
import SearchContainer from './containers/SearchContainer';
import AboutPage from './components/AboutPage';
import ScrollToTop from './components/ScrollToTop';

import 'styles/app.less';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <ThemeContainer>
            <Switch>
              <Route exact path="/" component={HomeContainer} />
              <Route exact path="/about" component={AboutPage} />
              <Route path="/explore/:post_type/:category/:tag/:query" component={SearchContainer} />
              <Route path="/explore/:post_type/:category/:tag" component={SearchContainer} />
              <Route path="/explore/:post_type/:category" component={SearchContainer} />
              <Route path="/explore/:post_type" component={SearchContainer} />
              <Route exact path="/explore" component={SearchContainer} />
              <Route exact path="/search/:query" component={SearchContainer} />
              <Route path="/:post_type/:category" component={SearchContainer} />
              <Route path="/:post_type/:category/:tag" component={SearchContainer} />
              <Route path="/:post_type/:category/:tag/:query" component={SearchContainer} />
              <Route path="/:postSlug" component={PostContainer} />
            </Switch>
          </ThemeContainer>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}
