require(['app','approuter','appcontroller'],function(app, AppRouter, appController){
  'use strict';
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
