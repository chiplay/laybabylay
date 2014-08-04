define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'hbar!templates/tab-nav'
], function($, _, Backbone, Marionette, vent, tabNavTpl){

  return Marionette.ItemView.extend({

    template: tabNavTpl,

    tagName: 'a',

    className: 'nav-btn',

    events: {
      'click': 'navigate'
    },

    bindings: {
      ':el': {
        attributes: [
          {
            name: 'class',
            observe: 'index',
            onGet: function(){
              return this.type;
            }
          },
          {
            name: 'class',
            observe: ['index','first','last'],
            onGet: function(values) {
              var index = values[0],
                  first = values[1],
                  last = values[2];
              if (this.type === 'prev') {
                return last ? 'disabled' : '';
              }
              if (this.type === 'next') {
                return first ? 'disabled' : '';
              }
            }
          }
        ]
      }
    },

    initialize: function(options) {
      options = options || {};
      this.type = options.type;
      this.loading = false;

      vent.on('load:prev load:next load:start', function() {
        this.loading = true;
      }, this);

      vent.on('load:complete', function() {
        this.loading = false;
      }, this);
    },

    onDomRefresh: function() {
      this.stickit();
    },

    navigate: function() {
      if (this.type === 'next' && !this.loading) vent.trigger('nav:next');
      if (this.type === 'prev' && !this.loading) vent.trigger('nav:prev');
    }

  });

});