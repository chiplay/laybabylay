// html skeleton provider
function template(title, initialState = {}, content = "", styleTags = "") {
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
    <title>${title}</title>
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
    <link rel="shortcut icon" href="/favicon.ico">
    <link href="/main.css" rel="stylesheet">
    ${styleTags}
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