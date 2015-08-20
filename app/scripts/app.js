import config from './config';
import $ from 'jquery';
// import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import Router, { Route, DefaultRoute, RouteHandler, HistoryLocation } from 'react-router';

// import  from 'vent';
// import Raygun from 'raygun';
// import FastClick from 'fastclick';
// import SearchResults from 'models/SearchResults';
// import HeaderComponent from 'components/HeaderComponent';
import '../styles/app.less';

class App extends React.Component {
  render() {
    <div>
      <h1>Hello World</h1>
      <RouteHandler/>
    </div>
  }
}


let routes = (
  <Route name="app" handler={App} path="/">
    // <DefaultRoute handler={Home} />
    // <Route name="about" handler={About} />
    // <Route name="users" handler={Users}>
    //   <Route name="recent-users" path="recent" handler={RecentUsers} />
    //   <Route name="user" path="/user/:userId" handler={User} />
    //   <NotFoundRoute handler={UserRouteNotFound}/>
    // </Route>
    // <NotFoundRoute handler={NotFound}/>
    // <Redirect from="company" to="about" />
  </Route>
);

Router.run(routes, HistoryLocation, (Handler, routerState) => { // note "routerState" here
  React.render(
    <Provider store={store}>
      {() => <Handler routerState={routerState} />} // note "routerState" here: important to pass it down
    </Provider>,
    document.body
  );
});

// var app = new Marionette.Application();

// app.addRegions({
//   main: '#main',
//   header: '#header',
//   footer: '#footer',
//   modal: Marionette.Region.Modal.extend({
//     el: '.modal-region'
//   })
// });

// app.addInitializer(function (options) {

//   // analytics.initialize();

//   if (config.debug){
//     // if this is local, expose _app for debugging
//     window._app = app;
//     window._vent = vent;
//   }

//   // load raygun for error logging
//   Raygun.setVersion(config.version);
//   Raygun.init(config.raygunApiKey, { ignore3rdPartyErrors: true }).attach();

//   app.namespaces = options.namespaces;
//   app.config = config;

//   app.router = new options.AppRouter({
//     controller: options.appController
//   });

//   app.header.show( new HeaderView() );

//   FastClick.attach(document.body);

// });

// app.on('initialize:after', function () {
//   if (Backbone.history) {
//     Backbone.history.start({ pushState: true });
//   }
// });

// vent.commands.setHandler('update:title', function (title) {
//   title = title || '';
//   title += ' | Lay Baby Lay';
//   title = title.replace('&#8220;','“')
//                 .replace('&#8221;','”')
//                 .replace('&#8216;','‘')
//                 .replace('&#8217;','’');
//   $(document).attr('title', title);
// });

// /**
//  * Triggers a bootstrap modal with custom view
//  * @requires view - custom view
//  */
// vent.on('app:modal:show', function(view) {
//   if (app.modal.currentView) {
//     app.modal.currentView.model.set(view.model.attributes);
//     app.modal.currentView.render();
//     view.close();
//   } else {
//     app.modal.show(view);
//   }
// });

// vent.reqres.setHandler('fetch:url', function(type, category, tag, queryString) {
//   var url = '';
//   if (app.main.currentView && app.main.currentView.search) {
//     url = vent.request('search:fetch:url', type, category, tag, queryString);
//   } else {
//     url += type ? type + 's/' : 'all/';
//     if (category) url += 'in/' + category + '/';
//     if (tag) url += 'tagged/' + tag + '/';
//     if (queryString) url += 'q=' + queryString;
//   }
//   return url;
// });

// vent.reqres.setHandler('search:model', function() {
//   var model = app.searchModel || new SearchResults();
//   app.searchModel = model;
//   return model;
// });

// // Application wide event for calling router.navigate
// vent.commands.setHandler('navigate', function(route, trigger){
//   app.router.navigate(route, { trigger: trigger });
//   // window.scrollTo(0,0);
// });

export default app;