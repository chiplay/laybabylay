// server.js
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
app.use(compression());

app.use((req, res, next) => {
  if (req.get('X-Forwarded-Proto') !== 'https') {
    return res.redirect(`https://${req.get('Host')}${req.url}`);
  }

  // permanently redirect non-www request (except dev)
  if (!(/^(www|dev)\..*/.test(req.get('Host')))) {
    return res.redirect(301, `https://www.laybabylay.com${req.url}`);
  }

  return next();
});

// Prerender
app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));

// Redirects
app.get('/sitemap.xml', (req, res) => res.redirect(301, 'https://wp.laybabylay.com/sitemap.xml'));
app.get('/wp-admin', (req, res) => res.redirect(301, 'https://wp.laybabylay.com/wp-admin'));
app.get('/search/posts/tagged/portfolio', (req, res) => res.redirect(301, '/explore/posts/portfolio'));
app.get('/style-boards', (req, res) => res.redirect(301, '/explore/posts/style-boards'));

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'dist')));

// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Production Express server running at localhost: ${PORT}`);
});
