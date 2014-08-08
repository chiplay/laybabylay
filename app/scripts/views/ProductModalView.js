define([
  'q',
  'analytics',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'components/facebook',
  'vent',
  'views/RelatedPostsView',
  'views/TagsView',
  'views/CategoriesView',
  'hbar!templates/product-modal'
],

function (q, analytics, $, _, Backbone, Marionette, facebook, vent, RelatedPostsView, TagsView, CategoriesView, modalTpl) {

  return Marionette.Layout.extend({

    template: modalTpl,

    className: 'modal fade',

    regions: {
      related: '.related-posts-region',
      categories: '.categories-region',
      tags: '.tags-region'
    },

    events: {
      'click .close-btn': 'closeModal',
      'click .facebook-button': 'showFBDialog',
      'click .tweet-button': 'showTweetDialog',
      'click .pinterest-button': 'showPinDialog',
      'click .image': 'trackLink',
      'click .purchase-link': 'trackLink'
    },

    bindings: {
      '.title': {
        observe: 'title',
        updateMethod: 'html'
      },
      '.vendor': {
        observe: 'vendor',
        onGet: function(val) {
          return val && val !== 'false' ? val : '';
        }
      },
      '.image': {
        attributes: [{
          name: 'href',
          observe: 'link'
        }]
      },
      '.image img': {
        attributes: [{
          name: 'src',
          observe: 'image',
          onGet: function(val) {
            return val ? val.get('url') : '';
          }
        }]
      },
      '.description': {
        observe: 'description',
        updateMethod: 'html'
      },
      '.purchase-link': {
        observe: 'vendor',
        onGet: function(val) {
          return val ? 'Shop @ ' + val : 'Product Link';
        },
        attributes: [{
          name: 'href',
          observe: 'link'
        }]
      },
      '.tweet-button': {
        attributes: [{
          name: 'data-href',
          observe: ['link','title'],
          onGet: function(values) {
            var href = 'https://twitter.com/share';
            href += '?url=' + encodeURIComponent(values[0]);
            href += '&related=laybabylay';
            href += '&text=' + encodeURIComponent(values[1]);
            return href;
          }
        }]
      },
      '.pinterest-button': {
        attributes: [{
          name: 'data-href',
          observe: ['url','image.url','title'],
          onGet: function(values) {
            var href = '//www.pinterest.com/pin/create/button/';
            href += '?url=' + encodeURIComponent(values[0]);
            href += '&media=' + encodeURIComponent(values[1]);
            href += '&description=' + encodeURIComponent(values[2]);
            return href;
          }
        }]
      }
    },

    initialize: function(options) {
      _.bindAll(this,'closeModal','loadTags','loadRelatedPost');
    },

    onDomRefresh: function() {
      this.stickit();
      this.loadRelatedPost();
      this.loadTags();

      analytics.track('Viewed Product Modal', {
        category: this.model.get('link'),
        label: this.model.get('title')
      });
      // q(this.model.ready).then(this.loadRelatedPost).done();
      // q(this.model.ready).then(this.loadTags).done();
    },

    closeModal: function() {
      // The Modal Region listens to the application wide 'app:modal:close' event
      // to trigger the Bootstrap modal hide events - alert should follow
      vent.trigger('app:modal:close app:alert:close');
    },

    showFBDialog: function(ev) {
      ev.preventDefault();
      facebook.uiDialog({
        method: 'feed',
        display: 'popup',
        name: this.model.get('title'),
        link: this.model.get('link'),
        picture: this.model.get('image.url'),
        description: this.model.get('description').replace('<p>', '').replace('</p>', '')
      }, function(response){
        // console.log(response);
      });
    },

    showPinDialog: function(ev) {
      ev.preventDefault();
      var url = $(ev.currentTarget).attr('data-href'),
          w = 750,
          h = 300;
      this.openDialog(url, 'Pinterest', w, h);
    },

    showTweetDialog: function(ev) {
      ev.preventDefault();
      var url = $(ev.currentTarget).attr('data-href'),
          w = 550,
          h = 475;
      this.openDialog(url, 'Tweet', w, h);
    },

    openDialog: function(url, title, w, h) {
      var left = (screen.width/2)-(w/2),
          top = (screen.height/2)-(h/2);
      window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    },

    loadRelatedPost: function() {
      var relatedPost = this.model.get('related_styleboards');
      if (relatedPost.length) this.related.show( new RelatedPostsView({ collection: relatedPost }) );
    },

    loadTags: function() {
      var product_tags = this.model.get('taxonomy_product_tag'),
          product_types = this.model.get('taxonomy_product_type');
      if (product_tags.length) this.tags.show( new TagsView({ tags: product_tags }) );
      if (product_types.length) this.categories.show( new CategoriesView({ collection: product_types }) );
    },

    trackLink: function(ev) {
      ev.preventDefault();
      var link = $(ev.currentTarget),
          url = link.attr('href'),
          tmp = document.createElement('a');
      tmp.href = url;
      analytics.track('Outbound Traffic', {
        label: this.model.get('title'),
        category: tmp.hostname
      });
      _.delay(function() { window.vglnk && window.vglnk.click(url, '_blank'); }, 200);
    }

  });

});
