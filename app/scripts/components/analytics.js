define(function (require) {
  var analyticsJS = require('analyticsJS'),
      config = require('config');

  var analytics = {};

  analytics.initialize = function () {
    var providers = {};

    if (!config.debug || config.debug) {
      _.extend(providers, {
        // 'UserVoice': {
        //   apiKey: 'hg5DM7PQVU8kwnTwizVaBQ',
        //   showWidget: false
        // },
        // 'LiveChat': {
        //   'license': '1031844'
        // },
        // 'Keen IO': {
        //   projectId: '52da0260ce5e436cea000002',
        //   writeKey: '711e5bee3e6722db9c9a19e30a92b8908bac74b4858d896cbbbf8a71f31f1de84c5eb8942ffa797e39fc0357dbb5dbea65409d3fd0a72c37f85d4cda95b1b558769b795d9efdf4c4ee5325a5e33c3d025bf334c32726d027bb597a7ee17366e775eedcc6862d957434b3b94520c39ea7'
        // },
        // 'Heap': {
        //   apiKey: '445798696'
        // },
        // 'Totango': {
        //   service_id: "SP-7004-01"
        // },
        // 'KISSmetrics': {
        //   apiKey: 'a838fa9530ab2c859c7891e563f839650245cb52'
        //   //apiKey: '23a6d909f9e56cf08a37fed21b28c78beb847e97' // use for testing
        // },
        // 'Mixpanel': {
        //   token: '4d10402ce06f9a495fcda2f64751d312'
        // },
        // 'Woopra': {
        //   domain: 'new.relayfoods.com'
        // },
        // 'FoxMetrics': {
        //   appId: '52dff6f56952e41bec83740a'
        // },
        // 'trak.io': {
        //   token: 'e4c2a783252ac056c854d706897612b43cbb5b04'
        // },
        'Google Analytics': {
          trackingId: 'UA-5123840-19'
        }
      });
    }

    analyticsJS.initialize(providers);

    analyticsJS.ready(function () {
      // todo set "is tablet", at least for kiss metrics
    });
  };

  // analytics.identify = function (account) {
  //   var traits;

  //   // core traits
  //   traits = {
  //     email: account.get('Email'),
  //     firstName: account.get('FirstName'),
  //     lastName: account.get('LastName'),
  //     revenue: account.get('LifetimeValue')
  //     //created: ??
  //     //phone: ??
  //   };

  //   // uservoice specific
  //   traits.account = {};
  //   traits.account.ltv = account.get('LifetimeValue');

  //   analyticsJS.identify(account.get('AccountId'), traits);
  // };

  analytics.track = function () {
    analyticsJS.track.apply(this, arguments);
  };

  analytics.trackLink = function() {
    analyticsJS.track.apply(this, arguments);
  };

  analytics.page = function () {
    analyticsJS.page.apply(this, arguments);
  };

  return analytics;
});
