/**
 * Created by talc on 22/06/2016.
 */

"use strict";


import app from './app/appReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  app,
});

export default rootReducer;