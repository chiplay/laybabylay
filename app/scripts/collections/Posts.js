define([
  'backbone',
  'models/Post'
], function(Backbone, Post){

  return Backbone.Collection.extend({

    model: Post

    // parse: function(response) {
    //   return response.posts;
    // },

    // url: '/api/get_posts'

  });

});
