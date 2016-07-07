import objectAssign from 'object-assign';
import { hashHistory } from 'react-router';
import config from 'config';

// ------------------------------------
// Constants
// ------------------------------------

export const APP_INIT = 'APP_INIT';
export const APP_RESET = 'APP_RESET';
export const APP_USER_START = 'APP_USER_START';
export const APP_USER_FAILED = 'APP_USER_FAILED';
export const APP_PRE_START = 'APP_PRE_START';
export const APP_PRE_FAILED = 'APP_PRE_FAILED';
export const APP_PING_START = 'APP_PING_START';
export const APP_PING_FAILED = 'APP_PING_FAILED';
export const APP_MODE_CHANGE_START = 'APP_MODE_CHANGE_START';
export const APP_MODE_CHANGE_SUCCESS = 'APP_MODE_CHANGE_SUCCESS';
export const APP_MODE_CHANGE_FAILED = 'APP_MODE_CHANGE_FAILED';
export const APP_AGG_START = 'APP_AGG_START';
export const APP_AGG_FAILED = 'APP_AGG_FAILED';
export const APP_LOCAL_AGG_START = 'APP_LOCAL_AGG_START';
export const APP_LOCAL_AGG_FAILED = 'APP_LOCAL_AGG_FAILED';
export const APP_VULNERABILITY_AGG_START = 'APP_VULNERABILITY_AGG_START';
export const APP_VULNERABILITY_AGG_FAILED = 'APP_VULNERABILITY_AGG_FAILED';
export const APP_REFRESH_START = 'APP_REFRESH_START';
export const APP_REFRESH_FAILED = 'APP_REFRESH_FAILED';
export const APP_LOADED = 'APP_LOADED';

// ------------------------------------
// Actions
// ------------------------------------

// Changes app status
export function appReset (): Action {
  return { type: APP_RESET };
}

// Attempts to attach user
export function appUserStart (): Action {
  return { type: APP_USER_START };
}

// Changes app status
export function appUserFailed (error: object): Action {
  return { type: APP_USER_FAILED, error: error };
}

// Changes app status
export function appPreStart (): Action {
  return { type: APP_PRE_START };
}

// Changes app status
export function appPreFailed (error: object): Action {
  return { type: APP_PRE_FAILED, error: error };
}

// Changes app status
export function appPingStart (): Action {
  return { type: APP_PING_START };
}

// Changes app status
export function appPingFailed (error: object): Action {
  return { type: APP_PING_FAILED, error: error };
}

// Changes app mode
export function appModeChangeStart (mode: string): Action {
  return { type: APP_MODE_CHANGE_START, mode: mode };
}

// Changes app mode
export function appModeChangeSuccess (mode: string): Action {
  return { type: APP_MODE_CHANGE_SUCCESS, mode: mode };
}

// Changes app status
export function appModeChangeFailed (mode: string, error: object): Action {
  return { type: APP_MODE_CHANGE_FAILED, mode: mode, error: error };
}

// Changes app status
export function appAggStart (): Action {
  return { type: APP_AGG_START };
}

// Changes app status
export function appAggFailed (error: object): Action {
  return { type: APP_AGG_FAILED, error: error };
}

// Changes app status
export function appLocalAggStart (): Action {
  return { type: APP_LOCAL_AGG_START };
}

// Changes app status
export function appLocalAggFailed (error: object): Action {
  return { type: APP_LOCAL_AGG_FAILED, error: error };
}

// Changes app status
export function appVulnerabilityAggStart (): Action {
  return { type: APP_VULNERABILITY_AGG_START };
}

// Changes app status
export function appVulnerabilityAggFailed (error: object): Action {
  return { type: APP_VULNERABILITY_AGG_FAILED, error: error };
}

// Changes app mode
export function appRefreshStart (mode: string): Action {
  return { type: APP_REFRESH_START, mode: mode };
}

// Changes app status
export function appRefreshFailed (mode: string, error: object): Action {
  return { type: APP_REFRESH_FAILED, mode: mode, error: error };
}

// Changes app status
export function appLoaded (mode: string): Action {
  return { type: APP_LOADED, mode: mode };
}

// Calls endpoint
export function appPost (url: string, appendUrl: boolean, data: object, method: string): Function {
  return (dispatch: Function) => {
    // Build post data
    let form_data = new FormData();
    if(Object.keys(data).length) { 
      for(let key of Object.keys(data)) {
        form_data.append(key, data[key]);
      }
    }
    // Add normal path? (trigger has seperate url)
    if(appendUrl) {
      url = config.apiUrlNoSite + url;
    }
    // Append method ?
    if(method) {
      url = url + '&method=' + method;
    }
    // Load data
    return fetch(url, {
      method: 'post',
      credentials: 'same-origin',
      body: form_data
    }).then((response: object) => {
      // Good?
      if (response.status >= 200 && response.status < 300) {
        return response.json();
        // @TODO handle Error
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        error.error = response.statusText;
        return error;
      }
    }).then((json: object) => {
      // Some error
      if(json.error || json.err || json === 'err: unknown') {
        let error = new Error();
        error.error = json;
        return error;
      }
      return json;
    }).catch(function (error) {
      return error;
    });
  };
}

export function appPre( mode: string = config.mode ): Function {
  return (dispatch: Function) => {
    dispatch(appPreStart());
    return dispatch(appPost('/apps/' + config.siteId, true, {}, 'GET')
    ).then((res) => {
      if(!(res instanceof Error)) {
        dispatch(appLoaded('test'));
        // @TODO Cache all these endpoints
        let allSet = true;
        let endpoints = [
          'stack',
          'accounts',
          'plugins'
        ]; 
        // If we're not in local, check domains
        if(mode !== 'local') {
          endpoints.push('domain');
        }
        endpoints.map((endpoint) => {
          if(res[endpoint]) {
            allSet = allSet;
          } else {
            allSet = false;
          }
        })
        if(allSet || forceDispatch) {
          dispatch(appLoaded(config.mode ? config.mode : 'remote'));
          return;
        }
      }
      // Someting went wrong, so dispatch failed
      // Then try the ping check
      dispatch(appPreFailed());
      // dispatch(appUser());
      dispatch(appLoaded('test'));
    }).catch((error) => {
      // Someting went wrong, so dispatch failed
      // Then try the ping check
      dispatch(appPreFailed());
      // dispatch(appUser());
      dispatch(appLoaded('test'));
    });
  }
}

//
// Attaches app user 
// @todo make work with proper errors... moving to ping no matter what
// since the enpoint returns 500 if user is already created
//
export function appUser(): Function {
  return (dispatch: Function) => {
    dispatch(appUserStart());
    return dispatch(appPost('/user-site/' + config.siteId, true, {}, 'POST')
    ).then((res) => {
      // We have an error
      if(res instanceof Error) {
        // Dispatch to local mode
        console.log('errir1');
        dispatch(appPing());
        dispatch(appUserFailed(res));
        return;
      }
      // Dispatch post all to get data
      console.log('errir2');
      dispatch(appUserFailed(res));
      dispatch(appPing());
    }).catch((error) => {
      // Dispatch to local mode
      console.log('errir3');
      dispatch(appUserFailed(error));
      dispatch(appPing());
    });
  }
}

//
// Attempts to have exteral server ping this one
//
export function appPing(): Function {
  return (dispatch: Function) => {
    dispatch(appPingStart());
    return dispatch(appPost('/monitor/' + config.siteId + '/ping', true, {}, 'POST')
    ).then((res) => {
      // We have an error
      if(res instanceof Error) {
        // Dispatch to local mode
        dispatch(appPingFailed(res));
        return;
      }
      // Dispatch post all to get data
      dispatch(appAggAll());
    }).catch((error) => {
      // Dispatch to local mode
      dispatch(appPingFailed(error));
    });
  }
}

/**
 * Attempts to have exteral server ping this one
**/
export function appModeChange(mode: string, reset: boolean = '', redirect: string = '') {
  return (dispatch: Function) => {
    dispatch(appModeChangeStart(mode));
    return dispatch(
      appPost(config.apiTrigger, false, {
          key: 'changeMode',
          mode: mode,
          siteId: config.siteId
      })
    ).then((res) => {
      // We have an error
      if(res instanceof Error) {
        // Dispatch to local mode
        dispatch(appModeChangeFailed(mode, res));
        return;
      }
      // Dispatch post all to get data
      dispatch(appModeChangeSuccess(mode));
      if(reset) {
        dispatch(appReset());
      }
      if(redirect) {
        hashHistory.push(redirect);
      }
    }).catch((error) => {
      // Dispatch to local mode
      dispatch(appModeChangeFailed(mode, error));
    });
  }
}

// Triggers full call 
export function appAggAll(): Function {
  return (dispatch: Function) => {
    let calls = [
      {
        url: config.apiTrigger,
        data: {
          key: 'changeMode',
          mode: 'remote',
          siteId: config.siteId
        }
      },
      {
        url:  '/monitor/' + config.siteId + '/domain',
        data: {},
        appendUrl: true
      },
      {
        url: '/monitor/' + config.siteId + '/plugins',
        data: {},
        appendUrl: true
      },
      {
        url: '/monitor/' + config.siteId + '/accounts',
        data: {},
        appendUrl: true
      },
      {
        url: '/monitor/' + config.siteId + '/stack',
        data: {},
        appendUrl: true
      },
      
    ];
    dispatch(appAggStart());
    return Promise.all(calls.map((call) => {
      return dispatch(appPost(call.url, call.appendUrl, call.data, call.method));
    })).then((returns) => {
      let error;
      // Agg results for errors
      returns.map((returnItem) => {
        if(returnItem.error) {
          error = returnItem.error;
        }
      });
      // we had some errors ?
      if(error) {
        // Dispatch failed
        dispatch(appAggFailed(error));
      }
      else {
        // Aggregate vulnerabilities
        dispatch(appVulnerabilityAgg('remote'));
      }
      
    })
    .catch((error) => {
      // Dispatch Failed
      dispatch(appAggFailed(error));
    });
  }
}

export function appLocalAggAll(): Function {
  return (dispatch: Function) => {
    let calls = [
      {
        url: config.apiTrigger,
        data: {
          key: 'changeMode',
          mode: 'local',
          siteId: config.siteId
        }
      },
      {
        url: config.apiTrigger,
        data: {
          key: 'plugins',
          endpoint: 'plugins',
          siteId: config.siteId
        }
      },
      {
        url: config.apiTrigger,
        data: {
          key: 'accounts',
          endpoint: 'accounts',
          siteId: config.siteId
        }
      },
      {
        url: config.apiTrigger,
        data: {
          key: 'stack',
          endpoint: 'stack',
          siteId: config.siteId
        }
      },
      
    ];
    dispatch(appLocalAggStart());
    return Promise.all(calls.map((call) => {
      return dispatch(appPost(call.url, call.appendUrl, call.data, call.method));
    })).then((returns) => {
      let error;
      // Agg results for errors
      returns.map((returnItem) => {
        if(returnItem.error) {
          error = returnItem.error;
        }
      });
      // we had some errors ?
      if(error) {
        dispatch(appLocalAggFailed(error));
      }
      else {
        // Aggregate vulnerabilities
        dispatch(appVulnerabilityAgg('local'));
      }
      
    })
    .catch((error) => {
      dispatch(appLocalAggFailed(error));
    });
  }
}

export function appVulnerabilityAgg(mode: string): Function {
  return (dispatch: Function) => {
    dispatch(appVulnerabilityAggStart());
    return dispatch(appPost(config.apiUrl + 'vulnerabilities', false, {}, 'GET')
    ).then((res) => {
      // We have an error
      if(res instanceof Error) {
        // Dispatch to local mode
        dispatch(appVulnerabilityAggFailed(res));
        return;
      }
      // Dispatch post all to get data
      dispatch(appLoaded(mode));
    }).catch((error) => {
      // Dispatch to local mode
      dispatch(appVulnerabilityAggFailed(error));
    });
  }
}

// export function siteRefreshData(): Function {
//   calls = [
//     {
//       url: config.apiTrigger,
//       data: {
//         key: 'stack',
//         endpoint: 'stack',
//         siteId: config.siteId
//       }
//     },
// }

export const actions = {
  appReset,
  appPreStart,
  appPreFailed,
  appPingStart,
  appPingFailed,
  appModeChangeStart,
  appModeChangeSuccess,
  appModeChangeFailed,
  appAggStart,
  appAggFailed,
  appLocalAggStart,
  appLocalAggFailed,
  appVulnerabilityAggStart,
  appVulnerabilityAggFailed,
  // appRefreshStart,
  // appRefreshFailed,
  appLoaded,
  appPost,
  appPre,
  appPing,
  appModeChange,
  appAggAll,
  appLocalAggAll,
  appVulnerabilityAgg
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [APP_RESET]: (state: object): object => {
    return objectAssign({}, state, {
      'status': APP_INIT
    });
  },
  [APP_PRE_START]: (state: object): object => {
    return objectAssign({}, state, {
      'status': APP_PRE_START
    });
  },
  
  [APP_PRE_FAILED]: (state: object, action: {error: object}): object => {
    return objectAssign({}, state, {
      'status': APP_PRE_FAILED,
      'error': action.error
    });
  },
  
  [APP_PING_START]: (state: object): object => {
    return objectAssign({}, state, {
      'status': APP_PING_START
    });
  },
  
  [APP_PING_FAILED]: (state: object, action: {error: object}): object => {
    return objectAssign({}, state, {
      'status': APP_PING_FAILED,
      'error': action.error
    });
  },

  [APP_MODE_CHANGE_START]: (state: object, action: {mode: string}): object => {
    return state;
  },

  [APP_MODE_CHANGE_SUCCESS]: (state: object, action: {mode: string}): object => {
    return objectAssign({}, state, {
      'mode': action.mode
    });
  },
  
  [APP_MODE_CHANGE_FAILED]: (state: object, action: {mode: string, error: object}): object => {
    return objectAssign({}, state, {
      'error': action.error
    });
  },

  [APP_AGG_START]: (state: object): object => {
    return objectAssign({}, state, {
      'status': APP_AGG_START
    });
  },
  
  [APP_AGG_FAILED]: (state: object, action: {error: object}): object => {
    return objectAssign({}, state, {
      'status': APP_AGG_FAILED,
      'error': action.error
    });
  },
  
  [APP_LOCAL_AGG_START]: (state: object): object => {
    return objectAssign({}, state, {
      'status': APP_LOCAL_AGG_START
    });
  },
  
  [APP_LOCAL_AGG_FAILED]: (state: object, action: {error: object}): object => {
    return objectAssign({}, state, {
      'status': APP_LOCAL_AGG_FAILED,
      'error': action.error
    });
  },

  [APP_VULNERABILITY_AGG_START]: (state: object): object => {
    return objectAssign({}, state, {
      'status': APP_VULNERABILITY_AGG_START
    });
  },
  
  [APP_VULNERABILITY_AGG_FAILED]: (state: object, action: {error: object}): object => {
    return objectAssign({}, state, {
      'status': APP_VULNERABILITY_AGG_FAILED,
      'error': action.error
    });
  },
  
  [APP_LOADED]: (state: object, action: {mode: string}): object => {
    return objectAssign({}, state, {
      'status': APP_LOADED,
      'mode': action.mode
    });
  }

};

// ------------------------------------
// Helper
// ------------------------------------

export function isAppLoaded(globalState) {
  return globalState.appState && globalState.appState.status === APP_LOADED;
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  status: APP_INIT,
  mode: config.mode
};

export default function appReducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
}
