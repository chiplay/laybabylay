define([
  'vent'
], function(vent){

  var __VERSION = window.__VERSION || '1.0.6';

  var config = {
    version: __VERSION,
    debug: (/laybabylay\.com/.test(window.location.host) ) ? false : true,
    fbApiKey: '149853455060313',
    fbPermissions: 'user_relationships, publish_stream, email',
    raygunApiKey: '4df+4P9h+vgzqPxFgGvvIQ==',
    cloudinaryUrl: 'http://res.cloudinary.com/laybabylay/image/upload/'
  };

  // Detect Device
  config.mobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEApp.Options.mobile/i);
    },
    any: function() {
      return (config.mobile.Android() || config.mobile.BlackBerry() || config.mobile.iOS() || config.mobile.Opera() || config.mobile.Windows());
    }
  };

  // Get global settings from config - possibly better to just require config?
  vent.reqres.setHandler('config',function(optionName) {
    if (!optionName){ return; }
    var value;

    if (config[optionName] !== undefined) {
      value = config[optionName];
    }
    return value;
  });

  return config;

});
