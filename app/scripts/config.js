const __VERSION = window.__VERSION || 'dev';

let config = {
  version: __VERSION,
  debug: (/laybabylay\.com/.test(window.location.host) ) ? false : true,
  fbApiKey: '149853455060313',
  fbPermissions: 'user_relationships, publish_stream, email',
  raygunApiKey: '4df+4P9h+vgzqPxFgGvvIQ==',
  cloudinaryUrl: 'https://res.cloudinary.com/laybabylay/image/upload/'
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

export default config;