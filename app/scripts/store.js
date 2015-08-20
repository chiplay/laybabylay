import { createStore, applyMiddleware } from 'redux';

import { combineReducers } from 'redux-immutable';

import thunk from 'redux-thunk';
import logger from './middleware/logger';

import Immutable from 'immutable';
import * as reducers from './reducers';
import _ from 'lodash';


let reducer,
    store,
    state = {};

state.tasks = [];
state.visibilityFilter = 'SHOW_ALL';

reducer = combineReducers(reducers);
store = applyMiddleware(thunk, logger)(createStore)(reducer, Immutable.fromJS(state));

export default store;