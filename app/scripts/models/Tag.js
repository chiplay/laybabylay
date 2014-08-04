define([
  'underscore',
  'models/AssociatedModel'
], function(_, AssociatedModel) {

  return AssociatedModel.extend({

    // urlRoot: 'api/get_author/',

    defaults: {
      slug: null, // "inspiration",
      title: null, // "Inspiration",
      description: null,
      parent: 0,
      post_count: 0
    },

    initialize: function() {
      this.on('change:selected', this.triggerSelected, this);
    },

    triggerSelected: function(model, isSelected) {
      var topic = isSelected ? 'selected' : 'deselected';
      this.trigger(topic, this);
    },

    select: function() {
      if (this.collection) {
        this.collection.trigger('tag:selected', this);
        this.collection.each(function(tag) {
          tag.deselect();
        });
      }
      this.set('selected', true);
    },

    deselect: function() {
      this.set('selected', false);
    }

  });

});
