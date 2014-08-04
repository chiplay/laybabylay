define([
  'config',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'analytics',
  'vent',
  'raygun',
  'fastclick',
  'models/SearchResults',
  'views/HeaderView',
  'regions/modal',
  'backbone.stickit',
  'backbone-associations'
], function(config, $, _, Backbone, Marionette, analytics, vent, Raygun, FastClick, SearchResults, HeaderView){

  var app = new Marionette.Application();

  app.addRegions({
    main: '#main',
    header: '#header',
    footer: '#footer',
    modal: Marionette.Region.Modal.extend({
      el: '.modal-region'
    })
  });

  app.addInitializer(function (options) {

    analytics.initialize();

    if (config.debug){
      // if this is local, expose _app for debugging
      window._app = app;
      window._vent = vent;
    }

    // load raygun for error logging
    Raygun.setVersion(config.version);
    Raygun.init(config.raygunApiKey).attach();

    app.namespaces = options.namespaces;
    app.config = config;

    app.router = new options.AppRouter({
      controller: options.appController
    });

    app.header.show( new HeaderView() );

    FastClick.attach(document.body);

  });

  app.on('initialize:after', function () {
    if (Backbone.history) {
      Backbone.history.start({ pushState: true });
    }
  });

  vent.commands.setHandler('update:title', function (title) {
    title = title || '';
    title += ' | Lay Baby Lay';
    title = title.replace('&#8220;','“')
                  .replace('&#8221;','”')
                  .replace('&#8216;','‘')
                  .replace('&#8217;','’');
    $(document).attr('title', title);
  });

  /**
   * Triggers a bootstrap modal with custom view
   * @requires view - custom view
   */
  vent.on('app:modal:show', function(view) {
    if (app.modal.currentView) {
      app.modal.currentView.model.set(view.model.attributes);
      app.modal.currentView.render();
      view.close();
    } else {
      app.modal.show(view);
    }
  });

  vent.reqres.setHandler('fetch:url', function(type, category, tag, queryString) {
    var url = '';
    if (app.main.currentView.search) {
      url = vent.request('search:fetch:url', type, category, tag, queryString);
    } else {
      url += type ? type + 's/' : 'all/';
      if (category) url += 'in/' + category + '/';
      if (tag) url += 'tagged/' + tag + '/';
      if (queryString) url += 'q=' + queryString;
    }
    return url;
  });

  vent.reqres.setHandler('search:model', function() {
    var model = app.searchModel || new SearchResults();
    app.searchModel = model;
    return model;
  });

  // Application wide event for calling router.navigate
  vent.commands.setHandler('navigate', function(route, trigger){
    app.router.navigate(route, { trigger: trigger });
    // window.scrollTo(0,0);
  });

  return app;

});