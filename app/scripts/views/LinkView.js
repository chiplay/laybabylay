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
      analytics.track('Outbound Traffic', {
        label: this.model.get('title'),
        category: tmp.hostname
      });
      _.delay(function() { window.vglnk && window.vglnk.click(url, '_blank'); }, 200);
    }

  });

});