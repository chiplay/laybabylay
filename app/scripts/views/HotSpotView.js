define([
  'q',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'analytics',
  'models/GetProduct',
  'views/ProductModalView',
  'hbar!templates/hot-spot'
], function(q, $, _, Backbone, Marionette, vent, analytics, GetProduct, ProductModalView, hotspotTpl){

  return Marionette.ItemView.extend({

    template: hotspotTpl,

    className: 'hot-spot',
    tagName: 'a',

    events: {
      'click': 'showProduct'
    },

    bindings: {
      ':el': {
        attributes: [
          {
            observe: ['top','left','width','height'],
            name: 'style',
            onGet: function(v) {
              var w = $(window).width(),
                  r = (w < 768) ? w / 768 : 1;
              return 'top:' + v[0]*r + 'px; left:' + v[1]*r + 'px; width:' + v[2]*r + 'px; height:' + v[3]*r + 'px;';
            }
          }
        ]
      },
      '.title': {
        observe: ['product.title','external_title'],
        updateMethod: 'html',
        onGet: function(values) {
          return values[0] || values[1] || '';
        }
      }
    },

    initialize: function(options) {
      this.options = options || {};
    },

    onRender: function() {
      this.stickit();
    },

    showProduct: function(ev) {
      if (ev) {
        ev.preventDefault();
        ev.stopPropagation();
      }
      var url = this.model.get('external_url'),
          tmp, getProduct, ready;

      if (url) {
        tmp = document.createElement('a');
        tmp.href = url;
        analytics.track('Outbound Traffic', {
          label: this.model.get('external_title'),
          category: tmp.hostname
        });
        _.delay(function() {
          if (window.vglnk) {
            window.vglnk.click(url, '_blank');
          } else {
            window.open(url, '_blank');
          }
        }, 50);
        return;
      }

      getProduct = new GetProduct();
      ready = getProduct.fetch({
        data: { slug: this.model.get('product.slug') }
      });
      q(ready).then(function(){
        var modalView = new ProductModalView({ model: getProduct.get('product') });
        vent.trigger('app:modal:show', modalView);
      });
      analytics.track('Clicked Hotspot', {
        category: this.model.collection.parents[0].get('title'),
        label: this.model.get('product.title')
      });
    }

  });

});