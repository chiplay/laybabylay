require('@babel/register');

// Polyfill document for vanilla-lazyload... :( super gross
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const doc = new JSDOM('<!doctype html><html><body></body></html>').window.document;
const win = doc.defaultView;

global.document = doc;
global.window = win;
global.navigator = {
  userAgent: 'Windows'
};

// And polyfill react-slick
require('matchmedia-polyfill');
require('matchmedia-polyfill/matchMedia.addListener');

const express = require('express');
const path = require('path');
const compression = require('compression');
const { matchPath } = require('react-router-dom');
const template = require('./app/server/template');
const ssr = require('./app/server/ssr');
const configureStore = require('./app/scripts/store/configureStore').default;
const routes = require('./app/scripts/routes').default;

const app = express();
app.use(compression());

app.use((req, res, next) => {
  // if (req.get('X-Forwarded-Proto') !== 'https') {
  //   return res.redirect(`https://${req.get('Host')}${req.url}`);
  // }

  // permanently redirect non-www request (except dev)
  // if (!(/^(www|dev)\..*/.test(req.get('Host')))) {
  //   return res.redirect(301, `https://www.laybabylay.com${req.url}`);
  // }

  return next();
});

// Redirects
app.get('/sitemap.xml', (req, res) => res.redirect(301, 'https://wp.laybabylay.com/sitemap.xml'));
app.get('/wp-admin', (req, res) => res.redirect(301, 'https://wp.laybabylay.com/wp-admin'));
app.get('/search/posts/tagged/portfolio', (req, res) => res.redirect(301, '/explore/posts/real-nursery'));
app.get('/big-kid-room', (req, res) => res.redirect(301, '/explore/posts/big-kid-room'));
app.get('/bits-of-experience', (req, res) => res.redirect(301, '/explore/posts/bits-of-experience'));
app.get('/boy-nursery', (req, res) => res.redirect(301, '/explore/posts/boy-nursery'));
app.get('/details', (req, res) => res.redirect(301, '/explore/posts/details'));
app.get('/downloads', (req, res) => res.redirect(301, '/explore/posts/downloads'));
app.get('/fashion', (req, res) => res.redirect(301, '/explore/posts/fashion'));
app.get('/favorites', (req, res) => res.redirect(301, '/explore/posts/favorites'));
app.get('/girl-nursery', (req, res) => res.redirect(301, '/explore/posts/girl-nursery'));
app.get('/giveaway', (req, res) => res.redirect(301, '/explore/posts/giveaway'));
app.get('/grown-up-spaces', (req, res) => res.redirect(301, '/explore/posts/grown-up-spaces'));
app.get('/inspiration', (req, res) => res.redirect(301, '/explore/posts/inspiration'));
app.get('/neutral-nursery', (req, res) => res.redirect(301, '/explore/posts/neutral-nursery'));
app.get('/parties', (req, res) => res.redirect(301, '/explore/posts/parties'));
app.get('/playroom', (req, res) => res.redirect(301, '/explore/posts/playroom'));
app.get('/projects', (req, res) => res.redirect(301, '/explore/posts/projects'));
app.get('/reader-inquiries', (req, res) => res.redirect(301, '/explore/posts/reader-inquiries'));
app.get('/real-nursery', (req, res) => res.redirect(301, '/explore/posts/real-nursery'));
app.get('/roundup', (req, res) => res.redirect(301, '/explore/posts/roundup'));
app.get('/shared-room', (req, res) => res.redirect(301, '/explore/posts/shared-room'));
app.get('/shop', (req, res) => res.redirect(301, '/explore/posts/shop'));
app.get('/style-boards', (req, res) => res.redirect(301, '/explore/posts/style-boards'));
app.get('/toddler-room', (req, res) => res.redirect(301, '/explore/posts/toddler-room'));
// Product Types
app.get('/accessories', (req, res) => res.redirect(301, '/explore/posts/accessories'));
app.get('/art', (req, res) => res.redirect(301, '/explore/posts/art'));
app.get('/bedding', (req, res) => res.redirect(301, '/explore/posts/bedding'));
app.get('/chairs', (req, res) => res.redirect(301, '/explore/posts/chairs'));
app.get('/clothes', (req, res) => res.redirect(301, '/explore/posts/clothes'));
app.get('/cribs', (req, res) => res.redirect(301, '/explore/posts/cribs'));
app.get('/curtains', (req, res) => res.redirect(301, '/explore/posts/curtains'));
app.get('/dressers', (req, res) => res.redirect(301, '/explore/posts/dressers'));
app.get('/fabric', (req, res) => res.redirect(301, '/explore/posts/fabric'));
app.get('/furniture', (req, res) => res.redirect(301, '/explore/posts/furniture'));
app.get('/lighting', (req, res) => res.redirect(301, '/explore/posts/lighting'));
app.get('/mobiles', (req, res) => res.redirect(301, '/explore/posts/mobiles'));
app.get('/ottoman', (req, res) => res.redirect(301, '/explore/posts/ottoman'));
app.get('/pillows', (req, res) => res.redirect(301, '/explore/posts/pillows'));
app.get('/rugs', (req, res) => res.redirect(301, '/explore/posts/rugs'));
app.get('/storage', (req, res) => res.redirect(301, '/explore/posts/storage'));
app.get('/toys', (req, res) => res.redirect(301, '/explore/posts/toys'));
// Pages
app.get('/search', (req, res) => res.redirect(301, '/explore/posts'));
app.get('/home', (req, res) => res.redirect(301, '/'));
app.get('/products', (req, res) => res.redirect(301, '/explore/products'));
// Misc
app.get('/search/all/in/style-boards', (req, res) => res.redirect(301, '/explore/posts/style-boards'));
app.get('/search/all/in/style-boards/tagged/boy-nursery', (req, res) => res.redirect(301, '/explore/posts/boy-nursery'));
app.get('/search/posts/in/style-boards/tagged/boy-nursery', (req, res) => res.redirect(301, '/explore/posts/boy-nursery'));
app.get('/search/all/in/style-boards/tagged/girl-nursery', (req, res) => res.redirect(301, '/explore/posts/girl-nursery'));
app.get('/search/posts/in/style-boards/tagged/girl-nursery', (req, res) => res.redirect(301, '/explore/posts/girl-nursery'));
// RSS
app.get('/feed', (req, res) => res.redirect(301, 'https://wp.laybabylay.com/feed'));

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('public'));

// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  // Configure the store with the initial state provided
  const store = configureStore();

  // Dynamic data fetching based on route... but not sure we need this to just handle the homepage and individual post
  const dataRequirements =
    routes
      .filter(route => matchPath(req.url, route)) // filter matching paths
      .map(route => route.component) // map to components
      .filter(comp => comp.fetchData) // check if components have data requirement
      .map(comp => {
        // dispatch data requirement
        const urlParts = req.path.split('/');

        // for "/some-post" -> ["", "some-post"]
        // for homepage, "/" -> ["", ""]
        const slug = urlParts[1] || 'home';
        if (Array.isArray(comp.fetchData)) {
          return comp.fetchData.map(_fetch => store.dispatch(_fetch()))
        } else {
          return store.dispatch(comp.fetchData(slug));
        }
      });

  Promise.all(Array.prototype.concat(...dataRequirements))
    .then(() => {
      const { preloadedState, content, styleTags } = ssr(store, req);
      const response = template("Server Rendered Page", preloadedState, content, styleTags);
      res.setHeader('Cache-Control', 'assets, max-age=604800');
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      // What to do when the data fetching fails? 
      const { preloadedState, content, styleTags } = ssr(store, req);
      const response = template("Server Rendered Page - Failed Data Fetch", preloadedState, content, styleTags);
      res.setHeader('Cache-Control', 'assets, max-age=604800');
      res.send(response);
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Production Express server running at localhost: ${PORT}`);
});
