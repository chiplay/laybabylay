import HomeContainer from './containers/HomeContainer';
import PostContainer from './containers/PostContainer';
import SearchContainer from './containers/SearchContainer';
import AboutPage from './components/AboutPage';

export default [
  {
    path: "/",
    component: HomeContainer,
    exact: true
  },
  {
    path: "/about",
    component: AboutPage,
    exact: true
  },
  {
    path: "/explore/:post_type/:category/:tag/:query",
    component: SearchContainer,
  },
  {
    path: "/explore/:post_type/:category/:tag",
    component: SearchContainer,
  },
  {
    path: "/explore/:post_type/:category",
    component: SearchContainer
  },
  {
    path: "/explore/:post_type",
    component: SearchContainer,
  },
  {
    path: "/explore",
    component: SearchContainer,
    exact: true
  },
  {
    path: "/search/:query",
    component: SearchContainer
  },
  {
    path: "/:post_type/:category/:tag/:query",
    component: SearchContainer,
  },
  {
    path: "/:post_type/:category/:tag",
    component: SearchContainer,
  },
  {
    path: "/:post_type/:category",
    component: SearchContainer,
  },
  {
    path: "/:postSlug",
    component: PostContainer,
  }
];