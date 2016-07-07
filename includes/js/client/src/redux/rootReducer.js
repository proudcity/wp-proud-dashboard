import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import appReducer from './modules/appReducer';
import usersReducer from './modules/usersReducer';
import analyticsReducer from './modules/analyticsReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  appState: appReducer,
  usersState: usersReducer,
  analyticsState: analyticsReducer,
  router,
  form: formReducer
});
