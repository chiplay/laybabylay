import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { H } from 'highlight.run';

import ThemeContainer from './containers/ThemeContainer';
import ScrollToTop from './components/ScrollToTop';
import routes from './routes';
import '../styles/app.less';

if (typeof __CLIENT__ !== 'undefined') {
  require('../../favicon.ico');
}

H.init('3ng21re1', {
  environment: 'production',
  enableStrictPrivacy: true,
});

pendo && pendo.initialize();

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
