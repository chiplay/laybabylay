define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'views/RelatedPostView',
  'hbar!templates/related-posts'

], function($, _, Backbone, Marionette, vent, RelatedPostView, relatedPostsTpl){

  return Marionette.CompositeView.extend({

    template: relatedPostsTpl,

    className: 'related-posts',

    itemView: RelatedPostView,
    itemViewContainer: '.related-post-list',

    initialize: function() {
    },

    onDomRefresh: function() {

    }

  });

});