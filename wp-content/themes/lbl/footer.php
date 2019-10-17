<?php
wp_footer();
?>

<script type="text/javascript">
  window.analytics=window.analytics||[],window.analytics.methods=["identify","group","track","page","pageview","alias","ready","on","once","off","trackLink","trackForm","trackClick","trackSubmit"],window.analytics.factory=function(t){return function(){var a=Array.prototype.slice.call(arguments);return a.unshift(t),window.analytics.push(a),window.analytics}};for(var i=0;i<window.analytics.methods.length;i++){var key=window.analytics.methods[i];window.analytics[key]=window.analytics.factory(key)}window.analytics.load=function(t){if(!document.getElementById("analytics-js")){var a=document.createElement("script");a.type="text/javascript",a.id="analytics-js",a.async=!0,a.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.io/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n)}},window.analytics.SNIPPET_VERSION="2.0.9",
  window.analytics.load("9u0ojk4mt9");
</script>

<script src="<?= get_template_directory_uri(); ?>/dist/app.js"></script>

<script src="//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"></script>
<script>
  window.WebFont && window.WebFont.load({ typekit: { id: 'mex0hpo' } });
</script>

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
(function(d){
    var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
    p.type = 'text/javascript';
    p.async = true;
    p.src = '//assets.pinterest.com/js/pinit.js';
    f.parentNode.insertBefore(p, f);
}(document));
</script>

<script type="text/javascript">
  var vglnk = { key: 'bc30fb7cd8ff1adadd2b8b70a7ec44db' };
  (function(d, t) {
    var s = d.createElement(t); s.type = 'text/javascript';
    s.async = true;
    s.src = '//cdn.viglink.com/api/vglnk.js?key=' + vglnk.key;
    var r = d.getElementsByTagName(t)[0];
    r.parentNode.insertBefore(s, r);
  }(document, 'script'));
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

</body>
</html>