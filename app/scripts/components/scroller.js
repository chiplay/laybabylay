// Filename: scroller.js

// A Request Animation Frame style of collecting scroll position
// without hurting performance by performing operations on window.onScroll
// from http://www.html5rocks.com/en/tutorials/speed/animations/

define([
  'vent',
  'underscore',
  'components/polyfills/raf'
],
function(vent, _){

  var scroller = {
    viewScrollTop: 0,
    latestKnownScrollY: 0
  };

  var update = _.throttle(function() {
    vent.trigger('scroll:update', scroller.viewScrollTop);
  }, 17);

  var ticking = false,
      rafId;

  var updateFrame = function() {
    scroller.viewScrollTop = scroller.latestKnownScrollY;
    vent.trigger('scroll:update', scroller.viewScrollTop);
    rafId = window.requestAnimationFrame( updateFrame );
  };

  var stopFrame = _.debounce(function() {
    scroller.viewScrollTop = scroller.latestKnownScrollY;
    vent.trigger('scroll:stop', scroller.viewScrollTop);
    window.cancelAnimationFrame( rafId );
    rafId = null;
    ticking = false;
  }, 200);

  var requestTick = function() {
    if (!ticking) {
      rafId = window.requestAnimationFrame( updateFrame );
      vent.trigger('scroll:start', scroller.latestKnownScrollY);
    }
    stopFrame();
    ticking = true;
  };

  var onScroll = function() {
    scroller.latestKnownScrollY = scroller.el.scrollTop || scroller.el.scrollY;
    requestTick();
  };

  // Accepts a view element or defaults to the window
  scroller.init = function(el) {
    scroller.el = (el) ? el : window;
    scroller.el.addEventListener('scroll', onScroll, false);
  };

  return scroller;

});