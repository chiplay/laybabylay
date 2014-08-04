define([
  'config',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'moment',
  'vent',
  'hbar!templates/comment'
], function(config, $, _, Backbone, Marionette, moment, vent, commentTpl){

  return Marionette.ItemView.extend({

    tagName: 'li',

    className: 'comment',

    template: commentTpl,

    bindings: {
      '.comment-author-avatar': {
        observe: ['avatar','name'],
        updateMethod: 'html',
        onGet: function(values) {
          if (values[1] === 'Joni Lay') return '<img class="avatar" src="http://res.cloudinary.com/laybabylay/image/upload/q_40/avatar_v83vzd.jpg" alt="Joni Lay">';
          return values[0];
        },
        attributes: [{
          name: 'style',
          onGet: function(values) {
            var hex = Math.floor(Math.random() * 0xFFFFFF);
            return "border-color: #" + ("000000" + hex.toString(16)).substr(-6);
          }
        }]
      },
      ':el': {
        attributes: [{
          name: 'class',
          observe: 'parent',
          onGet: function(val) {
            return val ? 'child' : '';
          }
        }]
      },
      '.comment-body': {
        observe: 'content',
        updateMethod: 'html'
      },
      '.comment-date': {
        observe: 'date',
        onGet: function(val) {
          return moment(val).format('MMMM Do, YYYY');
        }
      },
      '.comment-author-name a': {
        observe: 'name',
        attributes: [{
          name: 'href',
          observe: 'url'
        }]
      }
    },

    events: {
      'click .comment-reply-link': 'commentReply'
    },

    initialize: function() {

    },

    onRender: function() {
      this.stickit();
    },

    commentReply: function(ev) {
      ev.preventDefault();
      this.model.collection.trigger('comment:reply',this.model,this.$el);
    }

  });

});
