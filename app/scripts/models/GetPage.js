define([
  'underscore',
  'backbone',
  'models/AssociatedModel',
  'models/Post'
], function(_, Backbone, AssociatedModel, Post) {

  var originalSync = Backbone.sync;

  return AssociatedModel.extend({

    urlRoot: '/api/get_page/',

    defaults: {
      page: {},
      status: null
    },

    defaultData: {
      include: 'acf,subtitle,comments,attachments,categories,colors,related_posts,comment_count,content,date,id,search_terms,slug,tags,title,type,url',
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
        key: 'page',
        relatedModel: Post
      }
    ]

  });

});
