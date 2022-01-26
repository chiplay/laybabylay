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
    (function(apiKey){
        (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
        v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
            o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
            y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
            z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
            pendo.initialize();
    })('6b140b7f-ac93-44c5-5d23-ade346ac19da');
    </script>

    <script>
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="nCFM7GI0bOdjRFVq6ZVjWpYMVQ61eIl0";analytics.SNIPPET_VERSION="4.13.2";
      analytics.load("nCFM7GI0bOdjRFVq6ZVjWpYMVQ61eIl0");
      analytics.page();
      }}();
    </script>
    
    <script type="application/javascript">
  (function(b,o,n,g,s,r,c){if(b[s])return;b[s]={};b[s].scriptToken="Xy0xOTMwMTQwMjc2";b[s].callsQueue=[];b[s].api=function(){b[s].callsQueue.push(arguments);};r=o.createElement(n);c=o.getElementsByTagName(n)[0];r.async=1;r.src=g;r.id=s+n;c.parentNode.insertBefore(r,c);})(window,document,"script","https://cdn.oribi.io/Xy0xOTMwMTQwMjc2/oribi.js","ORIBI");
</script>

<script>
(function(A,s,a,y,e,r){
  r=window.OpenReplay=[s,r,e,[y-1]];
  s=document.createElement('script');s.src=a;s.async=!A;
  document.getElementsByTagName('head')[0].appendChild(s);
  r.start=function(v){r.push([0])};
  r.stop=function(v){r.push([1])};
  r.setUserID=function(id){r.push([2,id])};
  r.setUserAnonymousID=function(id){r.push([3,id])};
  r.setMetadata=function(k,v){r.push([4,k,v])};
  r.event=function(k,p,i){r.push([5,k,p,i])};
  r.issue=function(k,p){r.push([6,k,p])};
  r.isActive=function(){return false};
  r.getSessionToken=function(){};
})(0, "8ykdN3yylOU5so2RRekr", "//static.openreplay.com/latest/openreplay.js",1,95);
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
