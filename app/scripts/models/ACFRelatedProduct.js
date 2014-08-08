define([
  'underscore',
  'backbone',
  'models/AssociatedModel',
  'collections/Attachments'
], function(_, Backbone, AssociatedModel, Attachments) {

  return AssociatedModel.extend({

    defaults: {
      type: null, // "product"
      slug: null,
      url: null,
      title: null,
      attachments: [],
    },

    relations: [
      {
        type: Backbone.Many,
        key: 'attachments',
        collectionType: Attachments
      }
    ]

  });

});
