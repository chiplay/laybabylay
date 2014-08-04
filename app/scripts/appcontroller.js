define([
  'q',
  'vent',
  'config',
  'app',
  'underscore',
  'marionette',
  'models/GetProduct',
  'views/SearchView',
  'views/ProductModalView',
  'views/AboutView',
  'views/PostView',
  'views/HomeView'
  // 'scripts'
],

function (q, vent, config, app, _, Marionette, GetProduct, SearchView, ProductModalView, AboutView, PostView, HomeView) {

  var AppController = Marionette.Controller.extend({

    index: function() {
      app.main.show( new HomeView() );
      vent.trigger('header:scroll:setup');
      window.scrollTo(0,0);
    },

    about: function() {
      app.main.show( new AboutView() );
      window.scrollTo(0,0);
    },

    post: function(slug) {
      app.main.show( new HomeView({ slug: slug }) );
      vent.trigger('header:scroll:setup');
      window.scrollTo(0,0);
    },

    searchTag: function(type, tags, query) {
      this.search(type, null, tags, query);
    },

    search: function(type, category, tags, query) {
      if (category && category.indexOf('q=') > -1) {
        query = category;
        category = null;
      }
      if (tags && tags.indexOf('q=') > -1) {
        query = tags;
        tags = null;
      }
      if (app.main.currentView && app.main.currentView.search) {
        vent.trigger('search:query', type, category, tags, query);
      } else {
        app.main.show( new SearchView({ type: type, category: category, tags: tags, query: query }) );
      }
      var title = 'Search';
      if (query) title += ' | ' + query.replace('q=','');
      vent.execute('update:title', title);
      window.scrollTo(0,0);
    },

    product: function(slug) {
      var getProduct = new GetProduct();
      var ready = getProduct.fetch({
        data: { slug: slug }
      });
      q(ready).then(function() {
        getProduct.get('product').ready = ready;
        var modalView = new ProductModalView({ model: getProduct.get('product') });
        app.modal.show( modalView );
      }).done();
      app.main.show( new HomeView() );
      window.scrollTo(0,0);
    },

    /**
     * @method invokeSubRoute
     * Takes all routes for the system and lazyloads
     * the namespaced modules via require
     * catch-all route = ':namespace(/*subroute)'
     * @param {String} route
     */
    invokeSubRoute: function(route){

      if (!_.contains(app.namespaces,route)) {
        var msg = 'Route is not a defined namespace ';
        // Show 404 Page?
        throw new Error(msg);
      }

      // Stop current running modules - side effects?
      _.each(app.namespaces,function(ns){
        if (app[ns]) app[ns].stop();
      });

      // Not using this at the moment
      // subroute = subroute || '';

      require(['ns/' + route + '/' + route],
        function(){
          app[route].start();
        }
      );
    }

  });

  return new AppController();

});
