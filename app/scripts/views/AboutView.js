define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'hbar!templates/about'
], function($, _, Backbone, Marionette, aboutTemplate){

  return Marionette.ItemView.extend({

		template: aboutTemplate,

    id: 'about',

    initialize: function(){
    },

    onRender: function(){
      // var products = new Products();
      // var appListView = new AppListView({ collection: apps});
      // appListView.render();
    }

  });

});
