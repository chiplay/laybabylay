define([
  'backbone',
  'underscore',
  'marionette',
  'vent',
  'analytics'
], function(Backbone, _, Marionette, vent, analytics) {

  return Marionette.AppRouter.extend({

    appRoutes: {
      '': 'index',
      'search(/)': 'search',
      'search/:type(/)': 'search',
      'search/:type/:query(/)': 'search',
      'search/:type/in/:category(/)': 'search',
      'search/:type/in/:category/:query(/)': 'search',
      'search/:type/tagged/:tags(/)': 'searchTag',
      'search/:type/tagged/:tags/:query(/)': 'searchTag',
      'search/:type/in/:category/tagged/:tags(/)': 'search',
      'search/:type/in/:category/tagged/:tags/:query(/)': 'search',
      'products(/)' : 'search',
      'products/:slug(/)' : 'product',
      'page/*num(/)': 'index',
      'about(/)': 'about',
      ':slug(/)' : 'post'
    },

    initialize: function() {
      this.pageBuffer = _.debounce(analytics.page, 500);
    },

    navigate: function(){
      this.pageBuffer();
      Backbone.Router.prototype.navigate.apply(this, arguments);
    }

  });

});