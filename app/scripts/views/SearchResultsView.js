define([
  'q',
  'jquery',
  'imagesloaded',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'masonry',
  'models/SearchResults',
  'collections/Posts',
  'views/SearchItemView'
], function(q, $, imagesloaded, _, Backbone, Marionette, vent, Masonry, SearchResults, Posts, SearchItemView){

  return Marionette.CollectionView.extend({

    itemView: SearchItemView,

    initialize: function(){
      _.bindAll(this,'masonryInit','loadPosts');
      this.collection = new Posts();
      this.listenTo(vent, 'scroll:update', this.loadMore, this);
      this.on('after:item:added', this.masonryAppend, this);
      this.listenTo(this.model, 'reset', this.resetPosts, this);
    },

    onDomRefresh: function() {
      this.windowHeight = $(window).height();
      this.documentHeight = $(document).height();
    },

    loadMore: function(pos) {
      var scroll_max = this.documentHeight - this.windowHeight;
      var dist_to_bottom = scroll_max - pos;

      if (dist_to_bottom < 1000 && !this.loading){
        this.loading = true;
        this.fetchMore();
      }
    },

    fetchMore: function() {
      var count = this.model.get('count'),
          count_total = this.model.get('count_total'),
          current_total = this.collection.length,
          pages = this.model.get('pages'),
          currentPage = current_total / count;

      if (count_total > current_total) {
        this.model.get('posts').reset();
        this.model.ready = this.model.fetch({
          data: { page: currentPage + 1 }
        });
        q(this.model.ready).then(this.loadPosts).done();
      }
    },

    loadPosts: function() {
      var _this = this;
      this.collection.set(this.model.get('posts').models, { merge: false, remove: false });
      _.delay(function(){
        _this.documentHeight = $(document).height();
        _this.loading = false;
      }, 500);
    },

    resetPosts: function() {
      this.loading = true;
      this.collection.reset(this.model.get('posts').models);
      this.masonryInit();
    },

    setColumns: function() {
      var windowWidth = $(window).width();
      return windowWidth >= 992 ? 4 : windowWidth >= 768 ? 3 : 2;
    },

    masonryInit: function(){
      if (this.masonry) this.masonry.destroy();

      var columns = this.setColumns(),
          windowWidth = $(window).width(),
          containerWidth = windowWidth >= 1240 ? 1080 : windowWidth * 0.94,
          columnWidth = containerWidth / columns,
          _this = this;

      this.$el.imagesLoaded()
        .always( function(){
          _this.masonry = new Masonry('.search-results-region', {
            itemSelector: '.search-item',
            visibleStyle: { opacity: 1 },
            hiddenStyle: { opacity: 0 },
            transitionDuration: '0.8s'
          });
          _this.loading = false;
          _this.documentHeight = $(document).height();
        });
      this.loading = false;
      this.documentHeight = $(document).height();
    },

    masonryAppend: function(view){
      var _this = this;
      view.$el.css({ opacity: 0 });

      // ensure that images load before adding to masonry layout
      view.$el.imagesLoaded(function(){
        // show elems now they're ready
        view.$el.css({ opacity: 1 });
        if (_this.masonry) _this.masonry.appended(view.$el, false);
        _this.documentHeight = $(document).height();
      });
    }
  });

});
