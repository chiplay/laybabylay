define([
  'underscore',
  'models/AssociatedModel'
], function(_, AssociatedModel) {

  return AssociatedModel.extend({

    urlRoot: '/api/respond/submit_comment',

    defaults: {
      content: null, // "<p>I discovered that giveaway yesterday &amp; am crossing my fingers I&#8217;ll be a winner. <img src="http://local.laybabylay.com/wp/wp-includes/images/smilies/icon_wink.gif" alt=";)" class="wp-smiley" />  ps. I would LOVE if you designed a collection. I&#8217;m a big Lay Baby Lay fan. <img src="http://local.laybabylay.com/wp/wp-includes/images/smilies/icon_wink.gif" alt=";)" class="wp-smiley" /> </p>↵"
      date: null, // "2014-01-07 16:10:00"
      id: null, // 10713
      post_id: null,
      name: null, // "Brianne Heape"
      email: null,
      parent: null, // 0
      url: null // "http://aheapeoflove.com/"
    },

    whitelist: [
      'content',
      'post_id',
      'email',
      'parent',
      'url',
      'name'
    ]

  });

});
