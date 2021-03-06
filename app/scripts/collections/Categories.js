define([
  'backbone',
  'models/Tag'
], function(Backbone, Tag){

  return Backbone.Collection.extend({

    model: Tag,

    url: '/api/get_category_index',

    comparator: function(item) {
      return item.get('title');
    }

  });

});
