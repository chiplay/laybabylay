define([
  'jquery',
  'marionette',
  'underscore'
], function($, Marionette, _) {

  Marionette.Region.Post = Marionette.Region.extend({

    show: function(view, direction){

      var _this = this,
          windowWidth = $(window).width();

      this.ensureEl();

      var isViewClosed = view.isClosed || _.isUndefined(view.$el);

      var isDifferentView = view !== this.currentView;

      if (isDifferentView || isViewClosed) {
        var modifier = (direction == 'next') ? -1 : 1,
            entryWidth = $('#main_entries').width(),
            scrollTop = $(window).scrollTop(),
            navPos = $('#main_nav_wrapper').offset().top,
            windowOffset = '';

        if (scrollTop > navPos) {
          windowOffset = -scrollTop + navPos;
          $('body').stop().dequeue().animate({
            scrollTop: navPos
          }, 0);
        } else {
          windowOffset = 0;
        }

        view.render();

        if (direction == 'next') {
          view.$el
            .css({
              // width: entryWidth + 'px',
              left: windowWidth + 'px'
            });
        } else if (direction == 'prev') {
          view.$el
            .css({
              // width: entryWidth + 'px',
              right: windowWidth + 'px'
            });
        }

        this.$el.append(view.el);

        if (!this.currentView) {
          this.currentView = view;
        } else {
          this.currentView.$el.css({
            // width: entryWidth + 'px',
            position: 'absolute',
            left: 0,
            top: windowOffset + 'px'
          });

          this.currentView.$el.transition({
            translate: [ modifier * windowWidth, 0 ]
          }, 400, 'cubic-bezier(.2,.1,.3,1)', function(){
            //$('.main_data').attr('style','').remove();
            //$('.temp_data').attr('style','').attr('class','main_data flicker');
            $('.article_nav_btn').removeClass('no_click');
            _this.currentView.close();
            delete _this.currentView;

            _this.currentView = view;
            _this.currentView.$el.attr('style','');
          });

          view.$el.transition({
            translate: [ modifier * windowWidth, 0 ]
          }, 400, 'cubic-bezier(.2,.1,.3,1)');
        }

      }

      Marionette.triggerMethod.call(this, 'show', view);
      Marionette.triggerMethod.call(view, 'show');
    }

  });

  return Marionette;

});
