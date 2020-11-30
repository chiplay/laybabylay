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

    <script>
      window['_fs_debug'] = false;
      window['_fs_host'] = 'fullstory.com';
      window['_fs_script'] = 'fullstory.com/s/fs.js';
      window['_fs_org'] = '8SR6P';
      window['_fs_namespace'] = 'FS';
      (function(m,n,e,t,l,o,g,y){
          if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
          g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
          o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
          y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
          g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
          g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
          g.log = function(a,b) { g("log", [a,b]) };
          g.consent=function(a){g("consent",!arguments.length||a)};
          g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
          g.clearUserCookie=function(){};
      })(window,document,window['_fs_namespace'],'script','user');
    </script>
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
