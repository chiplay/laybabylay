define([
  'backbone',
  'models/Product'
], function(Backbone, Product){

  return Backbone.Collection.extend({

    model: Product

  });

});
