define([
  'underscore',
  'models/AssociatedModel',
  'models/Product'
], function(_, AssociatedModel, Product) {

  return AssociatedModel.extend({

    // urlRoot: '/api/get_posts/',

    defaults: {
      product: {}, // "product"
      top: null,
      left: null,
      width: null,
      height: null,
      external_url: null
    },

    relations: [
      {
        type: Backbone.One,
        key: 'product',
        relatedModel: Product
      }
    ]

  });

});
