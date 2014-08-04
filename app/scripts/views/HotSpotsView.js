define([
  'q',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'views/HotSpotView',
], function(q, $, _, Backbone, Marionette, vent, HotSpotView){

  return Marionette.CollectionView.extend({

    itemView: HotSpotView,

    className: 'hot-spots',

    // initialize: function(){},

    onDomRefresh: function() {

    }

  });

});
