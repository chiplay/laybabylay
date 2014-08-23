define([
  'q',
  'config',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'analytics',
  'components/scroller',
  'views/SearchFiltersView',
  'hbar!templates/header'

], function(q, config, $, _, Backbone, Marionette, vent, analytics, scroller, SearchFiltersView, headerTpl){

  return Marionette.Layout.extend({

    template: headerTpl,

    className: 'header',

    ui: {
      input: '.search-input',
      close: '.icon-close',
      search: '.icon-search',
      logo: '#logo a',
      menu: '.icon-menu'
    },

    regions: {
      filters: '.search-filters-region'
    },

    events: {
      'keyup @ui.input': 'checkKey',
      'click @ui.search': 'showSearch',
      'click @ui.input': 'showSearch',
      'click @ui.close': 'hideSearch',
      'click .search-cover': 'hideSearch',
      'click @ui.menu': 'toggleMenu',
      'click @ui.logo': 'home',
      'click .about-link': 'showAbout',
      'click .headshot': 'showAbout',
      'click .print-shop': 'clickPrintShop'
      // 'blur @ui.input': 'blurInput'
    },

    bindings: {
      '.instagram': {
        attributes: [{
          name: 'style',
          observe: 'instagramSrc',
          onGet: function(val) {
            return 'background-image: url(' + val + ');';
          }
        }]
      }
    },

    initialize: function() {
      // _.bindAll(this,'issueSearch','delaySearch');
      scroller.init();
      this.viewModel = new Backbone.Model();

      // var body = document.body,
      //     cover = document.createElement('div'),
      //     timer = 0;
      // cover.setAttribute('class','scroll-cover');

      // // http://www.thecssninja.com/javascript/pointer-events-60fps
      // this.listenTo(vent, 'scroll:start', function() {
      //   timer = _.delay(function(){ body.appendChild(cover); }, 100);
      // });

      // this.listenTo(vent, 'scroll:stop', function() {
      //   clearTimeout(timer);
      //   if (cover.parentNode) cover.parentNode.removeChild(cover);
      // });

      var search = vent.request('search:model');
      this.listenTo(search, 'reset', this.blurInput);

      // this.listenTo(vent, 'scroll:update', this.openMenu, this);
      this.listenTo(vent, 'header:scroll:setup', this.setupScroll);
      this.listenTo(vent, 'search:update:input', this.updateInput);
      this.listenTo(vent, 'search:loaded', function() {
        this.search = true;
      });

      this.delaySearch = _.debounce(this.issueSearch, 2000);
    },

    onDomRefresh: function() {
      this.filters.show( new SearchFiltersView() );
      this.fetchInstagram();
      this.setupScroll();
    },

    setupScroll: function () {
      this.$el.removeClass('fixed');
      this.stopListening(vent, 'scroll:update', this.fixHeader);
      this.listenTo(vent, 'scroll:update', this.fixHeader);
    },

    fixHeader: function(pos) {
      if (pos > 4) {
        this.$el.addClass('fixed');
      } else if (pos <= 4) {
        this.$el.removeClass('fixed');
      }
    },

    issueSearch: function(query){
      this.blurInput();
      var url = vent.request('fetch:url', null, null, null, query);
      vent.execute('navigate', 'search/' + url, true);
    },

    blurInput: _.debounce(function(ev) {
      if (ev) ev.stopPropagation();
      $('#main, #header').removeClass('search');
      if (this.ui.input.val() === '') {
        this.$el.removeClass('active');
      }
    },300),

    checkKey: function(ev) {
      // TODO - autocomplete + cover color on click
      ev.preventDefault();
      var query = this.ui.input.val();

      if (ev.keyCode === 13) {
        this.issueSearch(query);
        return false;
      }

      this.delaySearch(query);
    },

    updateInput: function(query) {
      this.$el.addClass('fixed active');
      this.ui.input.val(query);
    },

    toggleMenu: function() {
      var _this = this;

      if (window.innerWidth <= 768) {

        // iPhone gets the top slidedown menu
        var height = $('#menu').height();
        if (this.menu) {
          $('body').attr('style','');
          this.menu = false;
          this.stopListening(vent, 'scroll:update', this.closeMenu);
        } else {
          window.scrollTo(0,0);
          analytics.track('Viewed the Menu');
          this.menu = true;
          this.listenTo(vent, 'scroll:update', this.closeMenu);
          $('body').attr('style','-webkit-transform: translate3d(0, ' + height + 'px, 0); transform: translate3d(0, ' + height + 'px, 0);');
        }

      } else {

        // Everything else gets the footer menu
        if ($(document).hasClass('search') || !!$(document).find('#about').length) {
          this.home();
          _.delay(function() {
            _this.toggleMenu();
          }, 1500);
        } else {
          var $menu = $('#menu');
          if ($menu && $menu.length) $(document).scrollTop($menu.offset().top);
        }
      }
    },

    closeMenu: function(pos) {
      if (pos > 100) {
        this.toggleMenu();
      }
    },

    // openMenu: function(pos) {
    //   if (pos < -20) {
    //     this.toggleMenu();
    //     return;
    //   }
    //   if (pos < 0) {
    //     $('body').attr('style','-webkit-transform: translate3d(0, ' + pos*-1 + 'px, 0); transform: translate3d(0, ' + pos*-1 + 'px, 0);');
    //   } else if (pos >= 0) {
    //     $('body').attr('style','');
    //   }
    // },

    showSearch: function(ev) {
      if (ev) ev.preventDefault();
      this.$el.addClass('fixed active');
      $('#main, #header').addClass('search');
      this.ui.input.focus();
    },

    hideSearch: function(ev) {
      if (ev) ev.preventDefault();
      $('#main, #header').removeClass('search');
      this.ui.input.val('').blur();
      this.$el.removeClass('active');
    },

    fetchInstagram: function() {
      var _this = this;
      var fetched = $.ajax({
        url: 'https://api.instagram.com/v1/users/23543575/media/recent?client_id=8f4de1ccc04b4b92a48a6877840a26a6&count=1&callback=something',
        dataType: 'jsonp'
      });
      q(fetched).then(function(response){
        if (response.data && response.data[0] && response.data[0].images && response.data[0].images.standard_resolution) {
          _this.viewModel.set({ instagramSrc: response.data[0].images.standard_resolution.url });
          _this.stickit(_this.viewModel);
        }
      }).done();
    },

    home: function(ev) {
      this.hideSearch(ev);
      if (ev) ev.preventDefault();
      vent.execute('navigate', '/', true);
    },

    showAbout: function(ev) {
      this.hideSearch(ev);
      if (ev) ev.preventDefault();
      vent.execute('navigate', '/about', true);
      $(window).scrollTop(20);
    },

    clickPrintShop: function(ev) {
      analytics.track('Visited Print Shop', {
        label: 'Society6 Print Shop',
        category: 'Society6 Print Shop'
      });
    }

  });

});
