define([
  'underscore',
  'backbone',
  'models/AssociatedModel',
  'models/Post'
], function(_, Backbone, AssociatedModel, Post) {

  var originalSync = Backbone.sync;

  return AssociatedModel.extend({

    urlRoot: '/api/get_post/',

    defaults: {
      next_url: null,
      previous_url: null,
      post: {},
      status: null
    },

    defaultData: {
      include: 'nb_links,acf,styleboard_products,subtitle,comments,comment_status,attachments,categories,colors,excerpt,related_posts,comment_count,content,date,id,slug,tags,title,type,url',
      post_type: 'post',
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
        key: 'post',
        relatedModel: Post
      }
    ]

  });

});
