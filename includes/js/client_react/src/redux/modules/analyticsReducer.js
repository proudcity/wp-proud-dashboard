import objectAssign from 'object-assign';
import { hashHistory } from 'react-router';
import cuid from 'cuid';
import {default as uniqueArr} from 'utils/unique';

// ------------------------------------
// Constants
// ------------------------------------

export const ANALYTICS_FETCH_START = 'ANALYTICS_FETCH_START';
export const ANALYTICS_FETCH_SUCCESS = 'ANALYTICS_FETCH_SUCCESS';
export const ANALYTICS_FETCH_ERROR = 'ANALYTICS_FETCH_ERROR';


// ------------------------------------
// Actions
// ------------------------------------

export function fetchStart (): Action {
  return {
    type: ANALYTICS_FETCH_START,
  }
}

export function fetchSuccess (records): Action {
  return {
    type:    ANALYTICS_FETCH_SUCCESS,
    records: records,
  }
}

export function fetchError (error): Action {
  return {
    type:  ANALYTICS_FETCH_ERROR,
    error: error,
  }
}

// Fired when widget should get data
export function fetchRemote (url: string): Function {
  return (dispatch: Function) => {
    dispatch(fetchStart());
    // Load data
    return fetch(url, {
      method: 'get',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
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
      if(json && !json.error) {
        dispatch(fetchSuccess(json));
      }
      else {
        dispatch(fetchError(json));
      }
    }).catch(function (error) {
      dispatch(fetchError(error));
    });
  };
}

export const actions = {
  fetchStart,
  fetchSuccess,
  fetchError,
  fetchRemote,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [ANALYTICS_FETCH_START]: (state: object, action: {}): object => {
    return state;
  },
  [ANALYTICS_FETCH_SUCCESS]: (state: object, action: {records: Array}): object => {
    let records = action.records;
    // Try to combine
    if(state && state.length) {
      return uniqueArr(state.concat(records), '_id');
    }
    // just return
    return action.records;
  },
  [ANALYTICS_FETCH_ERROR]: (state: object, action: {error: object}): object => {
    // @todo log error ?
    return state;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = [];

export default function reducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
}
