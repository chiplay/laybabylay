define([
  'underscore',
  'backbone',
  'models/AssociatedModel',
  'models/Image',
  'collections/Tags',
  'collections/Attachments',
  'collections/RelatedPosts',
  'collections/RelatedProducts'
], function(_, Backbone, AssociatedModel, Image, Tags, Attachments, RelatedPosts, RelatedProducts) {

  var originalSync = Backbone.sync;

  return AssociatedModel.extend({

    urlRoot: '/api/get_product/',

    defaults: {
      type: null, // "product"
      slug: null,
      url: null,
      title: null,
      date: null, // "2013-04-02 14:08:25"
      taxonomy_product_tag: [],
      taxonomy_product_type: [],
      tags: [],
      author: {},
      attachments: [],
      price: null,
      vendor: null,
      link: null,
      description: null,
      image: {},
      related_products: [],
      related_styleboards: [],
      selected: false
    },

    relations: [
      {
        type: Backbone.Many,
        key: 'related_products',
        collectionType: RelatedProducts
      },
      {
        type: Backbone.Many,
        key: 'related_styleboards',
        collectionType: RelatedPosts
      },
      {
        type: Backbone.Many,
        key: 'taxonomy_product_type',
        collectionType: Tags
      },
      {
        type: Backbone.Many,
        key: 'taxonomy_product_tag',
        collectionType: Tags
      },
      {
        type: Backbone.Many,
        key: 'attachments',
        collectionType: Attachments
      },
      {
        type: Backbone.One,
        key: 'image',
        relatedModel: Image
      }
    ],

    initialize: function() {
      this.on('change:selected', this.triggerSelected, this);
      this.on('change:loaded', this.triggerLoaded, this);
    },

    triggerSelected: function(model, isSelected) {
      var topic = isSelected ? 'selected' : 'deselected';
      this.trigger(topic, this);
    },

    triggerLoaded: function(model, isLoaded) {
      var topic = isLoaded ? 'loaded' : 'unloaded';
      this.trigger(topic, this);
    },

    select: function() {
      if (this.collection) {
        this.collection.trigger('product:selected', this);
        this.collection.each(function(product) {
          product.deselect();
        });
      }
      this.set('selected', true);
    },

    deselect: function() {
      this.set('selected', false);
    },

    load: function() {
      this.set('loaded', true);
    },

    unload: function() {
      this.set('loaded', false);
    }

  });

});
