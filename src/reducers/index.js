import { combineReducers } from 'redux';

import appReducer from './appReducer';

const AppReducer = combineReducers({
  app: appReducer,
});

export default AppReducer;
