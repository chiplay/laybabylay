define([
  'underscore',
  'models/AssociatedModel'
], function(_, AssociatedModel) {

  return AssociatedModel.extend({

    // urlRoot: 'api/get_author/',

    defaults: {
      alt: "",
      caption: "",
      description: "",
      height: null, // 721
      id: null, // 4660
      mime_type: null, // "image/png"
      sizes: {},
      title: '', // "libby-side-table"
      url: null, // "http://res.cloudinary.com/laybabylay/image/upload/v1390140181/libby-side-table_hoxk98.png"
      width: null // 60
    }

  });

});
