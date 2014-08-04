// Filename: views/SidebarView.js

define([
  'vent',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'views/LinkView',
  'hbar!templates/sidebar'

], function(vent, $, _, Backbone, Marionette, LinkView, sidebarTemplate){

  return Marionette.CompositeView.extend({

		template: sidebarTemplate,
    itemView: LinkView,
    itemViewContainer: '.links',

		className: 'modal fade',

    events: {
      'click .close-btn': 'closeModal',
    },

    initialize: function(){
      this.collection = this.model.get('nb_links');
    },

    closeModal: function() {
      // The Modal Region listens to the application wide 'app:modal:close' event
      // to trigger the Bootstrap modal hide events - alert should follow
      vent.trigger('app:modal:close app:alert:close');
    }

  });

});
