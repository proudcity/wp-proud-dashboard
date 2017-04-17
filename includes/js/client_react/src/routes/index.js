import React from 'react';
import { Route, IndexRoute } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import EmptyPage from 'components/EmptyPage'; 
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import AppState from 'views/AppState';
import Dashboard from 'views/Dashboard';
import Analytics from 'views/Analytics';
import { appPre, isAppLoaded } from 'redux/modules/appReducer';

export default (store) => {

  const requireAppInit = (nextState, replace, cb) => {
    function checkInit() {
      // Still not working, so redirect
      if (!isAppLoaded(store.getState())) {
        replace('/');
      }
      cb();
    }
    // Not loaded, try to dispatch before redirect
    if(!isAppLoaded(store.getState())) {
      store.dispatch(appPre()).then(checkInit);
    }
    else{
      cb();
    }
  };

  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={AppState} />
      { /* Routes requiring init */ }
      <Route onEnter={requireAppInit}>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/analytics" component={Analytics}/>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={EmptyPage} status={404} />
    </Route>
  )
};
