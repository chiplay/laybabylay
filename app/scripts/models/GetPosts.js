define([
  'underscore',
  'backbone',
  'models/AssociatedModel',
  'collections/Posts'
], function(_, Backbone, AssociatedModel, Posts) {

  var originalSync = Backbone.sync;

  return AssociatedModel.extend({

    urlRoot: '/api/get_posts/',

    defaults: {
      status: null,
      count: 0,
      count_total: 0,
      pages: 0,
      posts: []
    },

    defaultData: {
      post_type: 'post',
      page: 1,
      count: 5,
      include: 'nb_links,acf,styleboard_products,subtitle,comments,comment_status,attachments,categories,colors,excerpt,related_posts,comment_count,content,date,id,slug,tags,title,type,url'
      // others?
      // sort: 2,
      // directions: asc / desc,
      // taxonomies / filters
    },

    // relations: [
    //   {
    //     type: Backbone.Many,
    //     key: 'posts',
    //     collectionType: Posts
    //   }
    // ],

    sync: function(method, model, options) {
      options.data = _.extend(this.defaultData, options.data);
      var params = _.extend({
        type: 'POST',
      }, options);
      return originalSync.call(model, method, model, params);
    }

  });

});
