define(function (require) {
  // var analyticsJS = require('analyticsJS'),
  //     config = require('config');

  // var analytics = {};

  // analytics.initialize = function () {
  //   var providers = {};

  //   if (!config.debug || config.debug) {
  //     _.extend(providers, {
  //       'Google Analytics': {
  //         trackingId: 'UA-5123840-19',
  //         includeSearch: true
  //       },
  //       'Google Tag Manager': {
  //         containerId: 'GTM-5MF9JS'
  //       }
  //     });
  //   }

  //   analyticsJS.initialize(providers);

  //   analyticsJS.ready(function () {
  //     // todo set "is tablet", at least for kiss metrics
  //   });
  // };

  // analytics.track = function () {
  //   analyticsJS.track.apply(this, arguments);
  // };

  // analytics.trackLink = function() {
  //   analyticsJS.track.apply(this, arguments);
  // };

  // analytics.page = function () {
  //   analyticsJS.page.apply(this, arguments);
  // };

  return window.analytics || {};
});
