define([
  'backbone',
  'models/Color'
], function(Backbone, Color){

  return Backbone.Collection.extend({

    model: Color,

    // url: '/api/get_tag_index'

  });

});
