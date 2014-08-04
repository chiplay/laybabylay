define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'views/PostView'
], function($, _, Backbone, Marionette, vent, PostView){

  return Marionette.CollectionView.extend({

    appendHtml: function(collectionView, itemView, index){
      var childAtIndex;
      if (collectionView.isBuffering) {
        collectionView.elBuffer.appendChild(itemView.el);
      } else {
        if (index === 0) {
          collectionView.$el.prepend(itemView.el);
        } else {
          childAtIndex = collectionView.$el.children().eq(index);
          if (childAtIndex.length) {
            childAtIndex.before(itemView.el);
          } else {
            collectionView.$el.append(itemView.el);
          }
        }
      }
    },

    className: 'swiper-wrapper',

    itemView: PostView,

    swiper: {
      moveStartThreshold: 10,
      onFirstInit: function(swiper){
        // TODO - Imagesloaded
        $('.swiper-container, .swiper-wrapper, .swiper-slide').height('auto');
      },
      onSlideChangeStart: function(swiper, direction){
        $(window).scrollTop(10);
        if (direction === 'next') {
          vent.trigger('load:prev');
        } else {
          vent.trigger('load:next');
        }
      },
      onSlideChangeEnd: function(swiper, direction) {
        vent.trigger('load:complete');
        // reversed to match WP prev / next directions
        // if (direction === 'next' && swiper.activeIndex > 5) {
        //   swiper.view.collection.remove(swiper.view.collection.at(0));
        //   swiper.swipeTo( swiper.activeIndex - 1, 0, false );
        //   swiper.view.model.set({ index: swiper.view.model.get('index') - 1 });
        // }
      }
    },

    initialize: function() {
      this.bufferEnable = _.debounce(this.enableNav, 300);
      this.on('after:item:added', this.bufferEnable, this);
    },

    enableNav: function() {
      vent.trigger('load:complete');
    }

  });

});