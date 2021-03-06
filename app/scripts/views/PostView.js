define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'moment',
  'vent',
  'analytics',
  'components/facebook',
  'components/scroller',
  'models/Post',
  'views/SidebarView',
  'views/PostColorsView',
  'views/CommentsView',
  'views/RelatedPostsView',
  'views/HotSpotsView',
  'hbar!templates/post',
  'jquery.lazyload'

], function($, _, Backbone, Marionette, moment, vent, analytics, facebook, scroller, Post, SidebarView, PostColorsView, CommentsView, RelatedPostsView, HotSpotsView, postTemplate){

  return Marionette.Layout.extend({

    tagName: 'article',

    className: 'post swiper-slide',

    template: postTemplate,

    regions: {
      colors: '.color-palette-region',
      categories: '.categories-region',
      comments: '.comments-region',
      related: '.related-posts-region',
      hotspots: '.hotspots-region'
    },

    bindings: {
      // ':el': {
      //   attributes: [{
      //     name: 'class',
      //     observe: 'loaded',
      //     onGet: function(val) {
      //       return val ? 'loaded' : 'unloaded';
      //     }
      //   }]
      // },
      '.title': {
        observe: 'title',
        updateMethod: 'html'
      },
      '.subtitle': {
        observe: 'subtitle',
        updateMethod: 'html'
      },
      '.date': {
        observe: 'date',
        onGet: function(val) {
          return moment(val).format('MMM Do, YYYY');
        }
      },
      '.content': {
        observe: 'content',
        updateMethod: 'html'
      },
      '.tweet-button': {
        attributes: [{
          name: 'data-href',
          observe: ['url','title'],
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
          observe: ['url','title'],
          onGet: function(values) {
            var firstImg = this.$('.content img').first();
            var href = '//www.pinterest.com/pin/create/button/';
            href += '?url=' + encodeURIComponent(values[0]);
            // if (firstImg) href += '&media=' + encodeURIComponent(firstImg.attr('data-original'));
            href += '&description=' + encodeURIComponent(values[1]);
            return href;
          }
        }]
      }
    },

    events: {
      'click .content img:not(.pin-it-button)': 'showSidebar',
      'click .content a': 'trackLink',
      'click .facebook-button': 'showFBDialog',
      'click .tweet-button': 'showTweetDialog',
      'click .pin-it-button': 'showPinDialog',
      'click .pinterest-button': 'showPinDialog'
    },

    initialize: function() {
      var _this = this;
      _.bindAll(this,'initSelected');
      this.listenTo(this.model, 'load:images', this.loadImages);
      this.listenTo(this.model, 'selected', this.bufferSelected);
      this.listenTo(this.model, 'deselected', this.removeListeners);
      // this.listenTo(this.model, 'deselected', this.removeAddthis, this);

      // add compression to images
      var content = this.model.get('content');
      var pattern = /<img.*?>/gm;

      content = content.replace(pattern, function (sMatch) {
        return sMatch.replace(/upload\/v/g,'upload/q_40/v')
                     .replace(/src=/ig,'data-original=')
                     .replace(/class="/ig,'class="lazy ');
      });

      // Society6 links
      // if (!(/jonilay/.test(content))) content = content.replace(/#\d+=\d+/i,'?utm_source=laybabylay&utm_medium=post&utm_campaign=styleboard&curator=jonilay');
      this.model.set({ content: content });

      this.adjustHeight = _.throttle(function (pos) {
        if (pos > 100) {
          $('.swiper-wrapper, .swiper-slide').height('auto');
          $('.swiper-container').height( _this.el.offsetHeight );
        }
      }, 1000);
    },

    onRender: function() {
      this.stickit();
      this.loadColors();
    },

    bufferSelected: function() {
      this.rafId = window.requestAnimationFrame( this.initSelected );
    },

    initSelected: function() {
      $(window).scrollTop($(window).scrollTop()+1);

      this.loadComments();
      this.loadRelatedPost();
      this.setupPinBtns();
      this.setupHotSpots();
      this.listenTo(vent, 'scroll:update', this.adjustHeight);
      vent.execute('update:title', decodeURIComponent(this.model.get('title').replace(/&#038;/g, '&')) );

      window.cancelAnimationFrame( this.rafId );
      var _this = this;
      _.delay(function() { _this.adjustHeight(101); }, 500);
    },

    removeListeners: function() {
      this.stopListening(vent, 'scroll:update', this.adjustHeight);
      if (this.isClosed) return;
      this.removePinBtns();
      this.comments.close();
      this.related.close();
      this.hotspots.close();
    },

    showSidebar: function(ev) {
      if (!this.model.get('nb_links').length) {
        if (ev) $(ev.currentTarget).next('button').click();
        return;
      }
      if (ev) {
        ev.preventDefault();
        ev.stopPropagation();
      }
      $(window).scrollTop($(window).scrollTop()+4);
      var sidebarView = new SidebarView({ model: this.model.clone() });
      vent.trigger('app:modal:show', sidebarView);
    },

    setupHotSpots: function() {
      if (this.isClosed) return;
      var categories = this.model.get('categories'),
          isBoard = categories.findWhere({ slug: 'style-boards' }),
          firstImg = this.$('.content img').first(),
          hotspotDiv = document.createElement('div');

      if (isBoard && firstImg) {
        hotspotDiv.setAttribute('class','hotspots-region');
        firstImg.after(hotspotDiv);
        this.hotspots.show( new HotSpotsView({ collection: this.model.get('styleboard_products') }) );
      }
    },

    setupPinBtns: function() {
      var _this = this;
      this.$('.content img').each(function(){
        _this.attachPinBtn(this);
      });
    },

    removePinBtns: function() {
      var _this = this;
      this.$('.content img').each(function(){
        _this.removePinBtn(this);
      });
    },

    attachPinBtn: function(el) {
      if (this.isClosed) return;
      var $image = $(el),
          href = '//www.pinterest.com/pin/create/button/',
          pinBtn = document.createElement('button');
      href += '?url=' + encodeURIComponent(this.model.get('url'));
      href += '&media=' + encodeURIComponent($image.attr('data-original'));
      href += '&description=' + encodeURIComponent(this.model.get('title'));
      pinBtn.setAttribute('data-href',href);
      pinBtn.setAttribute('class','pin-it-button');
      pinBtn.setAttribute('data-pin-do','buttonPin');
      pinBtn.setAttribute('data-pin-config','beside');
      pinBtn.setAttribute('data-pin-color','white');
      pinBtn.setAttribute('data-pin-height','20');
      $image.after(pinBtn);
      $image.hover(function() {
        $image.parent().addClass('hover');
      }, function() {
        $image.parent().removeClass('hover');
      });
    },

    removePinBtn: function(el) {
      if (this.isClosed) return;
      var $image = $(el);
      $image.next('button').remove();
      $image.unbind('mouseenter mouseleave');
    },

    showFBDialog: function(ev) {
      ev.preventDefault();
      facebook.uiDialog && facebook.uiDialog({
        display: 'popup',
        method: 'feed',
        name: this.model.get('title'),
        link: this.model.get('url'),
        picture: $('.content img').first().attr('src'),
        description: this.model.get('excerpt')
      }, function(response){
        // console.log(response);
      });
    },

    showPinDialog: function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
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

    loadImages: function() {
      this.$('.content img.lazy').lazyload({
        effect: 'fadeIn',
        threshold: 200,
        placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
      });
    },

    // adjustHeight: function(ev) {
    //   ev = ev || {};
    //   if (ev.origin !== 'http://disqus.com') return;
    //   var data = $.parseJSON( ev.data );
    //   if (data.name === 'mainViewRendered') {
    //     $('.swiper-wrapper, .swiper-slide').height('auto');
    //     $('.swiper-container').height( this.el.offsetHeight );
    //     window.removeEventListener('message', this.adjustHeight);
    //   }
    // },

    loadTags: function() {
      // TODO - Marionette CollectionView of board categories
    },

    loadRelatedPost: function() {
      if (this.isClosed) return;
      var relatedPost = this.model.get('related_posts');
      if (relatedPost.length) this.related.show( new RelatedPostsView({ collection: relatedPost }) );
    },

    loadColors: function() {
      if (this.isClosed) return;
      var colors = this.model.get('colors');
      if (colors.length) this.colors.show( new PostColorsView({ collection: colors }) );
    },

    loadComments: function() {
      if (this.isClosed) return;
      var comments = this.model.get('comments');
      comments.sortParents();
      this.comments.show( new CommentsView({ model: this.model, comments: comments }) );
    },

    trackLink: function(ev) {
      ev.preventDefault();
      var link = $(ev.currentTarget),
          url = link.attr('href'),
          tmp = document.createElement('a');
      tmp.href = url;
      window.ga('send', {
        hitType: 'event',
        eventAction: 'Outbound Traffic',
        eventLabel: url,
        eventCategory: tmp.hostname
      });
      _.delay(function() {
        if (window.vglnk && window.vglnk.click) {
          window.vglnk.click(url, '_blank');
        } else {
          window.open(url, '_blank');
        }
      }, 50);
    }

  });

});
