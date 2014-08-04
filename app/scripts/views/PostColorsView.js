define([
  'q',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'lbl',
  'views/PostColorView'
], function(q, $, _, Backbone, Marionette, vent, LBL, PostColorView){

  return Marionette.CollectionView.extend({

    itemView: PostColorView,

    className: 'colors',

    // initialize: function(){},

    onDomRefresh: function() {

    }

  });

});
