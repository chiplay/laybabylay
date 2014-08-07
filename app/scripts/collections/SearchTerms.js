define([
  'backbone',
  'models/SearchTerm'
], function(Backbone, SearchTerm){

  return Backbone.Collection.extend({

    model: SearchTerm

    // url: '/api/get_posts'

  });

});
