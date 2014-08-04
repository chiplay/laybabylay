define([
  'underscore',
  'backbone',
  'models/AssociatedModel',
  // 'models/Author',
  // 'models/CustomFields',
  'collections/StyleboardProducts',
  'collections/Tags',
  'collections/Base',
  'collections/Comments',
  'collections/Attachments',
  'collections/RelatedPosts',
  'collections/RelatedProducts',
  'collections/SearchTerms',
  'collections/Colors'
], function(_, Backbone, AssociatedModel, StyleboardProducts, Tags, Base, Comments, Attachments, RelatedPosts, RelatedProducts, SearchTerms, Colors) {

  return AssociatedModel.extend({

    urlRoot: '/api/get_posts/',

    defaults: {
      type: null, // "product"
      slug: null,
      url: null,
      title: null,
      subtitle: null,
      content: null,
      excerpt: null,
      date: null, // "2013-04-02 14:08:25"
      categories: [],
      tags: [],
      author: {},
      attachments: [],
      comment_count: 0,
      related_posts: [],
      colors: [],
      styleboard_products: [],
      search_terms: [],
      nb_links: [],
      // Product specific
      price: null,
      vendor: null,
      link: null,
      description: null,
      image: null,
      related_products: [],
      related_styleboards: [],
      loaded: false,
      selected: false
    },

    relations: [
      {
        type: Backbone.Many,
        key: 'nb_links',
        collectionType: Base
      },
      {
        type: Backbone.Many,
        key: 'styleboard_products',
        collectionType: StyleboardProducts
      },
      {
        type: Backbone.Many,
        key: 'search_terms',
        collectionType: SearchTerms
      },
      {
        type: Backbone.Many,
        key: 'related_posts',
        collectionType: RelatedPosts
      },
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
        key: 'colors',
        collectionType: Colors
      },
      {
        type: Backbone.Many,
        key: 'categories',
        collectionType: Tags
      },
      {
        type: Backbone.Many,
        key: 'comments',
        collectionType: Comments
      },
      {
        type: Backbone.Many,
        key: 'tags',
        collectionType: Tags
      },
      {
        type: Backbone.Many,
        key: 'attachments',
        collectionType: Attachments
      }
    ],

    initialize: function() {
      _.bindAll(this,'select','deselect');
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
        this.collection.trigger('post:selected', this);
        this.collection.each(function(post) {
          post.deselect();
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
