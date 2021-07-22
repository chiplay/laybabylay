// html skeleton provider
function template(title, initialState = {}, content = "", styleTags = "", helmet = {}) {
  let scripts = ''; // Dynamically ship scripts based on render type
  if (content) {
    scripts = `<script>
                window.__STATE__ = ${JSON.stringify(initialState).replace(/<\/script>/gi,'<\\/script>')}
               </script>
               <script src="/client.js"></script>
              `;
  } else {
    scripts = `<script src="/main.js"></script>`;
  }

  let page = `
  <html lang="en">
  <head>
    <meta charset="utf-8">
    ${helmet.title.toString()}
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="alternate" type="application/rss+xml" href="https://www.laybabylay.com/feed" />

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-5123840-19"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    </script>
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    <link rel="shortcut icon" href="/favicon.ico">
    <link href="/main.css" rel="stylesheet">
    ${styleTags}

    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "3w739ur8z4");
    </script>
    <script>
      !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
      posthog.init('fp82687YMXeuwUlzPuW86gb9nioiaD0pvNC2duASP10',{api_host:'https://app.posthog.com'})
    </script>
    <script type="text/javascript">
    (function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"fpState")&&(j=JSON.parse(decodeURIComponent(d(f,"fpState"))),"fpeditor"===j.action&&(b.sessionStorage.setItem("_fpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.freshpaint=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,
    0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="freshpaint";e.people=e.people||[];e.toString=function(b){var a="freshpaint";"freshpaint"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove people group page alias ready addEventProperties addInitialEventProperties removeEventProperty addPageviewProperties".split(" ");
    for(h=0;h<l.length;h++)c(e,l[h]);var f="set set_once union unset remove delete".split(" ");e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.4;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof FRESHPAINT_CUSTOM_LIB_URL?
    FRESHPAINT_CUSTOM_LIB_URL:"//perfalytics.com/static/js/freshpaint.js";(d=c.getElementsByTagName("script")[0])?d.parentNode.insertBefore(b,d):c.head.appendChild(b)}})(document,window.freshpaint||[]);
    freshpaint.init("6bd4c515-0a33-4121-8c4d-d0a7dcd1cff9");
    freshpaint.page();
    </script>
    <script>
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="nCFM7GI0bOdjRFVq6ZVjWpYMVQ61eIl0";analytics.SNIPPET_VERSION="4.13.2";
      analytics.load("nCFM7GI0bOdjRFVq6ZVjWpYMVQ61eIl0");
      analytics.page();
      }}();
    </script>
    
    <script>
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.highlightLib=t():e.highlightLib=t()}(this,(function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e){e.exports=JSON.parse('{"name":"highlight.run","version":"2.3.0","scripts":{"build":"webpack --mode=production --config=./webpack.config.js","dev":"doppler run -- webpack-dev-server --progress --colors --watch","lint":"prettier --check --write \'src/**/*.{ts,tsx,scss}\'","analyze":"webpack --mode=production --config=./webpack.config.js --json --profile > dist/firstload/src/stats.json && yarn webpack-bundle-analyzer dist/firstload/src/stats.json","test":"jest --detectOpenHandles"},"main":"dist/firstload/src/index.js","types":"dist/firstload/src/index.d.ts","devDependencies":{"@babel/preset-env":"^7.14.7","@babel/preset-typescript":"^7.14.5","@types/chrome":"^0.0.144","@types/jest":"^26.0.24","jest":"^27.0.6","jest-fail-on-console":"^2.0.4","prettier":"^2.2.1","ts-loader":"^8.0.4","typescript":"^4.0.3","webpack":"^4.44.1","webpack-bundle-analyzer":"^4.4.2","webpack-cli":"^3.3.12","webpack-dev-server":"^3.11.0"},"dependencies":{},"setupFiles":["./tests/jest.overrides.js"]}')},function(e,t,n){"use strict";n.r(t),n.d(t,"H",(function(){return u}));var i,r,o,s,a=n(0),c=function(){return(c=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},l=function(e,t){console.warn("Highlight Warning: ("+e+"): ",t)},u={options:void 0,init:function(e,t){try{if(u.options=t,"undefined"==typeof window||"undefined"==typeof document)return;i=document.createElement("script");var n=(null==t?void 0:t.scriptUrl)?t.scriptUrl:"https://static.highlight.run/index.js";i.setAttribute("src",n+"?"+(new Date).getMilliseconds()),i.setAttribute("type","text/javascript"),document.getElementsByTagName("head")[0].appendChild(i),i.addEventListener("load",(function(){r=new window.Highlight({organizationID:e,debug:null==t?void 0:t.debug,backendUrl:null==t?void 0:t.backendUrl,disableNetworkRecording:null==t?void 0:t.disableNetworkRecording,networkRecording:null==t?void 0:t.networkRecording,disableConsoleRecording:null==t?void 0:t.disableConsoleRecording,enableSegmentIntegration:null==t?void 0:t.enableSegmentIntegration,enableStrictPrivacy:(null==t?void 0:t.enableStrictPrivacy)||!1,firstloadVersion:a.version,environment:(null==t?void 0:t.environment)||"production",appVersion:null==t?void 0:t.version}),(null==t?void 0:t.manualStart)||r.initialize(e)}))}catch(e){l("init",e)}},consumeError:function(e,t,n){try{u.onHighlightReady((function(){return r.consumeCustomError(e,t,JSON.stringify(n))}))}catch(e){l("error",e)}},error:function(e,t){try{u.onHighlightReady((function(){return r.pushCustomError(e,JSON.stringify(t))}))}catch(e){l("error",e)}},track:function(e,t){try{u.onHighlightReady((function(){return r.addProperties(c(c({},t),{event:e}))}))}catch(e){l("track",e)}},start:function(){var e;try{if("Recording"===(null==r?void 0:r.state))return void console.warn("You cannot called `start()` again. The session is already being recorded.");if(null===(e=u.options)||void 0===e?void 0:e.manualStart)var t=setInterval((function(){r&&(clearInterval(t),r.initialize())}),200);else console.warn("Highlight Error: Can't call `start()` without setting `manualStart` option in `H.init`")}catch(e){l("start",e)}},stop:function(){try{u.onHighlightReady((function(){return r.stopRecording(!0)}))}catch(e){l("stop",e)}},identify:function(e,t){try{u.onHighlightReady((function(){return r.identify(e,t)}))}catch(e){l("identify",e)}},getSessionURL:function(){return new Promise((function(e,t){u.onHighlightReady((function(){var n=r.organizationID,i=r.sessionData.sessionID;n&&i?e("app.highlight.run/"+n+"/sessions/"+i):t(new Error("org ID or session ID is empty"))}))}))},getSessionDetails:function(){return new Promise((function(e,t){u.onHighlightReady((function(){var n=r.organizationID,i=r.sessionData.sessionID;if(n&&i){var o=r.getCurrentSessionTimestamp(),s=(new Date).getTime(),a="https://app.highlight.run/"+n+"/sessions/"+i,c=new URL(a),l=new URL(a);l.searchParams.set("ts",((s-o)/1e3).toString()),e({url:c.toString(),urlWithTimestamp:l.toString()})}else t(new Error("org ID or session ID is empty"))}))}))},onHighlightReady:function(e){try{if(r&&r.ready)e();else var t=setInterval((function(){r&&r.ready&&(clearInterval(t),e())}),200)}catch(e){l("onHighlightReady",e)}}};"undefined"!=typeof window&&(window.H=u),"undefined"!=typeof chrome&&(null===(o=null===chrome||void 0===chrome?void 0:chrome.runtime)||void 0===o?void 0:o.onMessage)&&(null===(s=null===chrome||void 0===chrome?void 0:chrome.runtime)||void 0===s||s.onMessage.addListener((function(e,t,n){var i=e.action;switch(console.log("[highlight] received '"+i+"' event from extension."),i){case"init":var r="http://localhost:8080/dist/index.js";console.log("url",r),u.init(1,{debug:!0,scriptUrl:r}),u.getSessionURL().then((function(e){n({url:e})}));break;case"stop":u.stop(),n({success:!0})}return!0})))}])}));
window.H.init('3ng21re1')
</script>

  </head>

  <body>

    <div id="root">${content}</div>

    <script src="//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"></script>
    <script>
      window.WebFont && window.WebFont.load({ typekit: { id: 'mex0hpo' } });
    </script>

    <script type="text/javascript">
    (function(d){
        var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
        p.type = 'text/javascript';
        p.async = true;
        p['data-pin-hover'] = true;
        p['data-pin-build'] = 'parsePins';
        p.src = '//assets.pinterest.com/js/pinit.js';
        f.parentNode.insertBefore(p, f);
    }(document));
    </script>

    <script type="text/javascript">
      var _rsan = {};
      _rsan.key = '3ab24552b3dd630d2d42e7486ddb56fbd70b6869';
      (function() {
          var rs = document.createElement('script');
          rs.type = 'text/javascript';
          rs.async = true;
          rs.src = ('https:' === document.location.protocol
          ? 'https://collect'
          : 'http://collect')
          + '.rewardstyle.com/c.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(rs, s);
      })();
    </script>

    ${scripts}

  </body>
  </html>
  `;
  return page;
} 

module.exports = template;
