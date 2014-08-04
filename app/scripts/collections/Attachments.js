define([
  'backbone',
  'models/Attachment'
], function(Backbone, Attachment){

  return Backbone.Collection.extend({

    model: Attachment,

    // url: '/api/get_tag_index'

  });

});
