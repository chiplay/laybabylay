define([
  'backbone',
  'models/StyleboardProduct'
], function(Backbone, StyleboardProduct){

  return Backbone.Collection.extend({

    model: StyleboardProduct,

    // url: '/api/get_posts'

  });

});
