define([
  'jquery',
  'analytics',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'hbar!templates/sidebar-link'
], function($, analytics, _, Backbone, Marionette, vent, linkTpl){

  return Marionette.ItemView.extend({

    template: linkTpl,

    className: 'sidebar-link',
    tagName: 'li',

    bindings: {
      'a': {
        observe: 'title',
        updateMethod: 'html',
        attributes: [{
          observe: 'link',
          name: 'href'
        }]
      }
    },

    events: {
      'click a': 'trackLink'
    },

    onRender: function() {
      this.stickit();
    },

    trackLink: function(ev) {
      ev.preventDefault();
      var url = this.model.get('link'),
          tmp = document.createElement('a');
      tmp.href = url;
      window.ga('send', {
        hitType: 'event',
        eventAction: 'Outbound Traffic',
        eventLabel: this.model.get('title'),
        eventCategory: tmp.hostname
      });
      _.delay(function() {
        if (window.vglnk && window.vglnk.click) {
          window.vglnk.click(url, '_blank');
        } else {
          window.open(url, '_blank');
        }
      }, 50);
    }

  });

});