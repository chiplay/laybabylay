define([
  'backbone',
  'models/ACFRelatedProduct'
], function(Backbone, ACFRelatedProduct){

  return Backbone.Collection.extend({

    model: ACFRelatedProduct

    // url: '/api/get_posts'

  });

});
