define([
  'underscore',
  'models/AssociatedModel'
], function(_, AssociatedModel) {

  return AssociatedModel.extend({

    urlRoot: '/api/get_author/',

    defaults: {
      slug: null, // "jonilay",
      name: null, // "jonilay",
      first_name: null, // "Joni",
      last_name: null, // "Lay",
      nickname: null, // "jonilay",
      url: null, // "http://laybabylay.com",
      description: null
    }

  });

});
