define([
  'backbone',
  'marionette',
  'analytics'
], function(Backbone, Marionette, analytics) {

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
      'about(/)': 'about',
      ':slug(/)' : 'post'
    },

    navigate: function(){
      _.delay(analytics.page, 500);
      Backbone.Router.prototype.navigate.apply(this, arguments);
    }

  });

});