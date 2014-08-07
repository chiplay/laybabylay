define([
  'backbone',
  'models/ACFRelatedPost'
], function(Backbone, ACFRelatedPost){

  return Backbone.Collection.extend({

    model: ACFRelatedPost

    // url: '/api/get_posts'

  });

});
