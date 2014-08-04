define([
  'q',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'views/CommentView',
  'models/Comment',
  'collections/Comments',
  'hbar!templates/comments'

], function(q, $, _, Backbone, Marionette, vent, CommentView, Comment, Comments, commentsTpl){

  return Marionette.CompositeView.extend({

    template: commentsTpl,

    className: 'comments',

    itemView: CommentView,
    itemViewContainer: '.comment-list',

    events: {
      'keyup input': 'checkKey',
      'click input#submit': 'submitComment',
      'click .see-all-comments': 'showComments',
      'click .cancel': 'hideForm',
      'click input[type=text]': 'focusInput',
      'click input[type=email]': 'focusInput',
      'click textarea': 'showForm'
    },

    bindings: {
      '.comment-count': {
        observe: 'comment_count',
        onGet: function(val) {
          var plural = (val !== 1) ? 's' : '';
          return val + ' Comment' + plural;
        }
      },
      ':el': {
        attributes: [{
          name: 'class',
          observe: 'state'
        }]
      },
      'textarea': {
        observe: 'comment_status',
        updateModel: false,
        updateView: false,
        attributes: [
          {
            name: 'class',
            onGet: function(val) {
              return (val === 'open') ? '' : 'disabled';
            }
          },
          {
            name: 'placeholder',
            onGet: function(val) {
              var adj = this.collection.length ? 'Join' : 'Start';
              return (val === 'open') ? adj + ' the conversation...' : 'Comments Closed';
            }
          }
        ]
      }
    },

    replyBindings: {
      '.reply-to-name': 'reply',
      'input[name="author"]': 'name',
      'input[name="email"]': 'email',
      'input[name="url"]': 'url',
      'textarea[name="comment"]': 'content'
    },

    initialize: function(options) {
      options = options || {};
      this.comments = options.comments;
      this.collection = new Comments(this.comments.first(3));
      _.bindAll(this,'commentResponse');
      this.model.set({ state: 'collapsed' });
      this.listenTo(this.comments, 'comment:reply', this.showReplyForm, this);
    },

    onDomRefresh: function() {
      this.stickit();
      this.newComment = new Comment({ post_id: this.model.get('id') });
      this.stickit(this.newComment, this.replyBindings);

      if (this.comments.length < 4) this.$('.see-all-comments').remove();
    },

    showComments: function(ev) {
      if (ev) ev.preventDefault();
      this.model.set({ state: 'expanded' });
      this.collection.reset(this.comments.models);
      $(window).scrollTop($(window).scrollTop()+1);
    },

    showForm: function(ev) {
      if (this.model.get('state') === 'expanded') {
        this.model.set({ state: 'form expanded' });
      } else {
        this.model.set({ state: 'form' });
      }
      this.$(ev.currentTarget).focus();
      _.delay(function(){ $(window).scrollTop($(window).scrollTop()+1); },100);
    },

    focusInput: function(ev) {
      this.$(ev.currentTarget).focus();
    },

    hideForm: function(ev) {
      if (ev) ev.preventDefault();
      this.$('textarea').blur();
      this.model.set({ state: 'collapsed' });
      this.render();
      $(window).scrollTop($(window).scrollTop()+1);
    },

    showReplyForm: function(model, $el) {
      this.newComment.set({ parent: model.get('id'), reply: model.get('name') });
      this.$('.comment-form').appendTo($el);
      this.model.set({ state: 'form' });
      this.$('textarea').attr('placeholder','Reply to ' + model.get('name')).focus();
      $(window).scrollTop($(window).scrollTop()+1);
    },

    submitComment: function(ev) {
      ev.preventDefault();
      var saved = this.newComment.save();
      q(saved).then(this.commentResponse).done();
    },

    commentResponse: function(response) {
      this.$('form input').removeClass('error');
      if (response.status === 'error') {
        if (!this.$('form input[name=email]').val()) this.$('form input[name=email]').addClass('error');
        if (!this.$('form input[name=author]').val()) this.$('form input[name=author]').addClass('error');
        return;
      }
      this.hideForm();
      this.model.set({ state: 'collapsed complete' });
    }

  });

});