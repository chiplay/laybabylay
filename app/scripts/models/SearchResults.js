define([
  'underscore',
  'backbone',
  'models/AssociatedModel',
  'collections/Posts',
  'models/Post',
  'models/Product'
], function(_, Backbone, AssociatedModel, Posts, Post, Product) {

  var originalSync = Backbone.sync;

  return AssociatedModel.extend({

    urlRoot: '/api/get_search_results/',

    defaults: {
      status: null,
      posts_per_page: 0,
      count_total: 0,
      pages: 0,
      posts: []
    },

    defaultData: {
      post_type: ['post','product'],
      tag: '',
      category_name: null,
      category_exclude: null,
      product_tag: '',
      product_type: null,
      paged: 1,
      posts_per_page: 20,
      search: null,
      orderby: 'rand',
      order: 'DESC',
      include: 'acf,styleboard_products,subtitle,description,link,color,vendor,price,image,related_styleboards,related_products,attachments,categories,colors,excerpt,related_posts,comment_count,comment_status,content,date,id,slug,tags,taxonomy_product_tag,taxonomy_product_type,title,type,url'
    },

    relations: [
      {
        type: Backbone.Many,
        key: 'posts',
        relatedModel: function (relation, attributes) {
          return function (attrs, options) {
            return (attrs.type === 'product') ? new Product(attrs) : new Post(attrs);
          };
        }
      }
    ],

    sync: function(method, model, options) {
      options.data = _.extend(this.defaultData, options.data);
      var params = _.extend({
        type: 'POST',
      }, options);
      return originalSync.call(model, method, model, params);
    }

  });

});
