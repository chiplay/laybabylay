define([
  'backbone',
  'models/AssociatedModel',
  'collections/Tags'
], function(Backbone, AssociatedModel, Tags){

  var originalSync = Backbone.sync;

  return AssociatedModel.extend({

    url: '/api/get_terms_index',

    defaults: {
      status: null,
      count: 0,
      tags: []
    },

    defaultData: {
      hide_empty: false,
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
        type: Backbone.Many,
        key: 'tags',
        collectionType: Tags
      }
    ]

  });

});
