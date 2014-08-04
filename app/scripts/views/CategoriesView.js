define([
  'q',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'collections/Categories',
  'views/CategoryView'
], function(q, $, _, Backbone, Marionette, vent, Categories, CategoryView){

  return Marionette.CollectionView.extend({

    itemView: CategoryView,

    className: 'category-list',
    tagName: 'ul',

    initialize: function(options){

    },

    onDomRefresh: function() {
      // this.stickit();
    }

  });

});
