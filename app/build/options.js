/*
 * Build related settings
 */
module.exports = {
  requirejs: {
    waitSeconds: 15,
    paths: {
      analytics: 'components/analytics',

      // require plugins
      text: '../bower_components/text/text',
      hbar: '../bower_components/requirejs-handlebars/hbars',

      // Foundational reqs (app won't work without)
      backbone: '../bower_components/backbone/backbone',
      marionette: '../bower_components/marionette/lib/core/amd/backbone.marionette',
      Handlebars: '../bower_components/handlebars/handlebars',
      lodash: '../bower_components/lodash/dist/lodash',
      jquery: '../bower_components/jquery/dist/jquery',
      moment: '../bower_components/moment/moment',

      // Backbone related
      'backbone-associations': '../bower_components/backbone-associations/backbone-associations',
      'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
      'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
      'backbone.stickit': '../lbl_components/backbone.stickit/backbone.stickit',

      // Bootstrap
      'bootstrap.modal': '../bower_components/bootstrap/js/modal',
      'bootstrap.transition': '../bower_components/bootstrap/js/transition',

      // The rest
      // 'handlebars.runtime': '../bower_components/handlebars/handlebars.runtime',
      'eventie/eventie': '../bower_components/eventie/eventie',
      'eventEmitter/EventEmitter': '../bower_components/eventEmitter/EventEmitter',
      fastclick: '../bower_components/fastclick/lib/fastclick',
      imagesloaded: '../bower_components/imagesloaded/imagesloaded',
      q: '../bower_components/q/q',
      swiper: '../bower_components/swiper/dist/idangerous.swiper',
      masonry: '../bower_components/masonry/dist/masonry.pkgd',
      raygun: '../bower_components/raygun4js/dist/raygun.vanilla',
      analyticsJS: '../lbl_components/analytics/analytics',
      fbsdk: '//connect.facebook.net/en_US/sdk'
    },
    map: {
      '*': {
        'underscore': 'lodash'
      }
    },
    shim: {
      'bootstrap.modal': {
        deps: [
          'jquery'
        ],
        exports: '$.fn.modal'
      },
      'bootstrap.transition': {
        deps: [
          'jquery'
        ],
        exports: '$.support.transition'
      },
      swiper: {
        deps: ['jquery'],
        exports: 'Swiper'
      },
      imagesloaded: 'jquery',
      Handlebars: {
        exports: 'Handlebars'
      },
      fbsdk: {
        exports: 'FB'
      }
    }
  }
};
