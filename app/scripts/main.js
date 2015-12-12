define(function(require) {
  var app = require('app'),
      AppRouter = require('approuter'),
      appController = require('appcontroller');

  var options = {
    'appController': appController,
    'AppRouter': AppRouter,
    'namespaces': [
      'home',
      'products',
      'catalog',
      'search',
      'inspiration'
    ]
  };
  app.start(options);
});