define([
  'backbone',
  'models/Comment'
], function(Backbone, Comment){

  return Backbone.Collection.extend({

    model: Comment,

    // url: '/api/get_tag_index'

    sortParents: function() {
      this.each(function(comment) {
        var parentId = comment.get('parent'),
            parentComment,
            parentIndex;
        if (parentId) {
          parentComment = this.findWhere({ id: parentId });
          parentIndex = this.indexOf(parentComment);
          this.remove(comment);
          this.add(comment, { at: parentIndex + 1 });
        }
      }, this);
    }

  });

});
