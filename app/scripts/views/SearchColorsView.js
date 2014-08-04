define([
  'q',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'views/ColorView',
], function(q, $, _, Backbone, Marionette, vent, ColorView){

  return Marionette.CollectionView.extend({

    itemView: ColorView,

    className: 'search-colors',

    // initialize: function(){},

    onDomRefresh: function() {

    }

  });

});
