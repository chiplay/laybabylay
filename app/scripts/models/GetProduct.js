define([
  'underscore',
  'backbone',
  'models/AssociatedModel',
  'models/Product'
], function(_, Backbone, AssociatedModel, Product) {

  var originalSync = Backbone.sync;

  return AssociatedModel.extend({

    urlRoot: '/api/get_product/',

    defaults: {
      product: {},
      status: null
    },

    defaultData: {
      include: 'description,link,color,vendor,price,image,related_styleboards,related_products,attachments,date,id,slug,taxonomy_product_tag,taxonomy_product_type,title,type,url',
      post_type: 'product',
      id: null,
      slug: null
    },

    sync: function(method, model, options) {
      options.data = _.extend(this.defaultData, options.data);
      var params = _.extend({
        type: 'POST',
      }, options);
      return originalSync.call(model, method, model, params);
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
