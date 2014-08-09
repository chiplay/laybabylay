define([
  'vent',
  'config',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'views/ProductModalView',
  'hbar!templates/search-item'
], function(vent, config, $, _, Backbone, Marionette, ProductModalView, searchItemTemplate){

  return Marionette.ItemView.extend({

    className: 'search-item',

		template: searchItemTemplate,

    events: {
      'click a.post-type': 'showPost',
      'click a.product-type': 'showProduct'
    },

    bindings: {
      '.title': {
        observe: 'title',
        updateMethod: 'html'
      },
      // '.price': {
      //   observe: ['type','product_price'],
      //   updateView: true,
      //   visible: true,
      //   onGet: function(values) {
      //     var priceArray = values[1],
      //         type = values[0],
      //         price = priceArray && _.first(priceArray);
      //     return (type === 'product' && price) ? '(est. ' + price + ')' : '';
      //   }
      // },
      '.image img': {
        attributes: [{
          observe: 'attachments',
          name: 'src',
          onGet: function(collection) {
            var image = collection && collection.first(),
                imageUrl = image && image.get('url'),
                filename = imageUrl && imageUrl.substring(imageUrl.lastIndexOf('/') + 1).slice(0, -4);
            return filename ? config.cloudinaryUrl + 'q_30,w_500,c_fit/' + filename + '.jpg' : '';
          }
        }]
      },
      'a': {
        attributes: [{
          name: 'class',
          observe: 'type',
          onGet: function(val) {
            return val + '-type';
          }
        }]
      }
    },

    initialize: function(){

    },

    onRender: function(){
      this.stickit();
    },

    showPost: function(ev) {
      ev.preventDefault();
      vent.execute('navigate', '/' + this.model.get('slug'), true);
      $(window).scrollTop(20);
    },

    showProduct: function(ev) {
      if (ev) ev.preventDefault();
      var modalView = new ProductModalView({ model: this.model.clone() });
      vent.trigger('app:modal:show', modalView);
    }

  });

});
