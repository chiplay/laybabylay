define([
  'vent',
  'jquery',
  'marionette',
  'underscore',
  'backbone',
  'swiper'
],

function(vent, $, Marionette, _, Backbone) {

  Marionette.Region.Swiper = Marionette.Region.extend({

    initialize: function() {
      _.bindAll(this,'destroySwiper');
    },

    onShow: function(view){
      // Mix in the view's swiper hash with the region defaults
      this.opts = this.getDefaultOptions(_.result(view, 'swiper'));

      // Interstingly enough - passing in this.opts actually affects this.opts
      // and gives us an instance that we can change below with require
      this.swiperObj = this.$el.swiper(this.opts);

      // Save a reference to the view for any swiper callback functions
      // this.swiperObj.region = this;
      // this.swiperObj.view = view;
      // view.swiper = this.swiperObj;

      // Region Nav Events - Called from Parent Composite View
      // Inverted to match wordpresses prev=older, next=newer naming
      this.listenTo(vent, 'nav:next', this.swiperObj.swipePrev);
      this.listenTo(vent, 'nav:prev', this.swiperObj.swipeNext);
      this.listenTo(vent, 'nav:jump', this.swiperObj.swipeTo); // index, speed, runCallbacks

      // Allow the collection view to trigger a reinit after items are added / removed
      this.listenTo(view, 'after:item:added item:removed', this.swiperObj.reInit);
      this.listenTo(view, 'collection:rendered', this.swiperObj.reInit);

      // Shut down the event listeners and clean up swiper
      this.listenTo(view, 'before:close', this.closeSwiper);
    },

    closeSwiper: function() {
      this.stopListening();
      _.delay(this.destroySwiper, 500);
    },

    destroySwiper: function() {
      if (this.swiperObj) this.swiperObj.destroy();
      delete this.swiperObj;
      delete this.opts;
    },

    getDefaultOptions: function(options) {
      options = options || {};
      return _.defaults(options, {
        slidesPerView: 1,
        slidePerGroup: 1,
        mode: 'horizontal',
        calculateHeight: false,
        autoResize: true
      });
    }

  });

  return Marionette;

});
