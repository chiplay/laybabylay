define([
  'vent',
  'underscore',
  'models/AssociatedModel'
], function(vent, _, AssociatedModel) {

  return AssociatedModel.extend({

    // urlRoot: 'api/get_author/',

    defaults: {
      color_label: null, // "Dover White",
      search_term: null, // "white",
      color: null, // "#f2efe3",
      paint_code: null // "SW 6385"
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
        this.collection.trigger('color:selected', this);
        this.collection.each(function(color) {
          if (color.get('selected')) {
            color.deselect();
            vent.execute('search:remove:tag',color.get('slug'));
          }
        });
      }
      this.set('selected', true);
    },

    deselect: function() {
      this.set('selected', false);
    }

  });

});
