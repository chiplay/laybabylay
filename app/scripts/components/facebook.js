define([
  'q',
  'fbsdk',
  'config'
],
/**
 * A module to wrap facebook's all.js library
 * @module components/facebook
 * @requires module:fbsdk (all.js from facebook)
 */
function(q, FBApi, config) {

  var facebookappid = config.fbApiKey,
      facebookpermissionsneeded = config.fbPermissions,
      debug = config.debug,
      facebook,
      authResponse = null;

  var console = window.console;

  if (!window.FB) {
    facebook = {};
    return facebook;
  }

  // window.FB.init && window.FB.init({
  //   appId: facebookappid,
  //   version: 'v2.0',
  //   cookie: true,
  //   xfbml: true
  // });

  facebook = {
    getLoginStatus: function(callback) {
      if (debug) console.log('*** getLoginStatus() called.');
      window.FB.getLoginStatus(function(response) {
        if (debug) console.log('*** FB.getLoginStatus callback: ' + response.status);
        if (response && response.authResponse){
          authResponse = response.authResponse;
        } else {
          authResponse = null;
        }
        if (callback){
          callback(response);
        }
      });
    },
    login: function(callback) {
      if (debug) console.log('*** login() called.');
      window.FB.login(function(response) {
        if (debug){
          var success = false;
          if (response && response.authResponse){
            success = true;
            authResponse = response.authResponse;
          } else {
            authResponse = null;
          }
          if (debug) console.log('*** FB.login callback. Success? ' + success.toString());
        }
        if (callback){
          callback(response);
        }
      }, {scope: facebookpermissionsneeded});
    },

    logout: function(callback) {
      if (debug) console.log('*** logout() called.');
      window.FB.logout(function(response) {
        if (debug) console.log('*** FB.logout callback.');
        if (callback){
          callback(response);
        }
      });
    },

    getUserName: function(callback) {
      if (debug) console.log('*** getUserName() called.');
      window.FB.api('/me', function(response){
        if (callback){
          if (debug) console.log('*** FB.api "/me" callback: ' + response.name);
          callback(response);
        }
      });
    },

    parseElements: function(el) {
      if (debug) console.log('*** parseUIElements() called.');
      if (el) {
        window.FB.XFBML.parse(el);
      } else {
        window.FB.XFBML.parse();
      }
    },

    uiDialog: function(params, callback) {
      if (debug) console.log('*** uiDialog() called.');
      window.FB.ui(params, function(response){
        if (callback){
          if (debug) console.log('*** FB.api "ui" callback: ' + response);
          callback(response);
        }
      });
    }
  };

  if (debug) {
    console.log('*********************** facebook all.js loaded and initialized.');
    window._fb = facebook;
  }


  return facebook;

});
