import { combineReducers } from 'redux';
import pages from './pages';
import posts from './posts';
import search from './search';
import app from './app';
// TODO: try to import * from './' instead of importing individual reducers

const rootReducer = combineReducers({
  pages,
  posts,
  search,
  app
});

export default rootReducer;