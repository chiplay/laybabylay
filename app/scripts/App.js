import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ThemeContainer from './containers/ThemeContainer';
import ScrollToTop from './components/ScrollToTop';
import routes from './routes';

import '../styles/app.less';

export default class App extends Component {
  render() {
    return (
      <ScrollToTop>
        <ThemeContainer>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
        </ThemeContainer>
      </ScrollToTop>
    );
  }
}
