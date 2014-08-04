define([
  'underscore',
  'models/AssociatedModel'
], function(_, AssociatedModel) {

  return AssociatedModel.extend({

    // urlRoot: '/api/get_posts/',

    defaults: {
      incorrect_term: null,
      replacement_term: null
    }

  });

});
