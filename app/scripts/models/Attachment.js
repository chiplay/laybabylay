define([
  'underscore',
  'models/AssociatedModel'
], function(_, AssociatedModel) {

  return AssociatedModel.extend({

    // urlRoot: 'api/get_author/',

    defaults: {
      url: null, // "http://local.laybabylay.com/wp/wp-content/uploads/2013/09/yellow-ochre-and-peachy-pink.jpg",
      slug: null, // "yellow-ochre-and-peachy-pink",
      title: null, // "baby room ideas",
      description: null, // "",
      caption: null, // "",
      parent: null,
      mime_type: null, // "image/jpeg",
      images: [ ]
    }

  });

});
