define([
  'config',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'hbar!templates/related-post'
], function(config, $, _, Backbone, Marionette, vent, relatedPostTemplate){

  return Marionette.ItemView.extend({

    tagName: 'li',

    className: 'related-post',

    template: relatedPostTemplate,

    bindings: {
      ':el': {
        observe: 'attachments',
        visible: function(collection) {
          return collection.length ? true : false;
        }
      },
      '.title': {
        observe: 'title',
        updateMethod: 'html'
      },
      'img': {
        attributes: [{
          observe: 'attachments',
          name: 'src',
          onGet: function(collection) {
            var image = collection && collection.first(),
                imageUrl = image && image.get('url'),
                filename = imageUrl && imageUrl.substring(imageUrl.lastIndexOf('/') + 1).slice(0, -4);
            return filename ? config.cloudinaryUrl + 'q_30,h_600,w_400,c_fill/' + filename + '.jpg' : '';
          }
        }]
      }
    },

    events: {
      'click img': 'showPost'
    },

    initialize: function() {
    },

    onRender: function() {
      this.stickit();
    },

    showPost: function(ev) {
      ev.preventDefault();
      vent.execute('navigate','/' + this.model.get('slug'), true);
    }

  });

});
