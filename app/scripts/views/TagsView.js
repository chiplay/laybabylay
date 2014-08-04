define([
  'q',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'collections/Tags',
  'views/TagView'
], function(q, $, _, Backbone, Marionette, vent, Tags, TagView){

  return Marionette.CollectionView.extend({


    itemView: TagView,

    className: 'tag-list',
    tagName: 'ul',

    initialize: function(options){
      this.collection = new Tags(options.tags.filter(this.tagFilter));
    },

    tagFilter: function(tag) {
      return tag.get('post_count') > 1;
    },

    onDomRefresh: function() {
      // this.stickit();
    }

  });

});
