import objectAssign from 'object-assign';
import { hashHistory } from 'react-router';
import cuid from 'cuid';
import {default as uniqueArr} from 'utils/unique';

// ------------------------------------
// Constants
// ------------------------------------

export const USERS_FETCH_START = 'USERS_FETCH_START';
export const USERS_FETCH_SUCCESS = 'USERS_FETCH_SUCCESS';
export const USERS_FETCH_ERROR = 'USERS_FETCH_ERROR';

export const USERS_CREATE_START = 'USERS_CREATE_START';
export const USERS_CREATE_SUCCESS = 'USERS_CREATE_SUCCESS';
export const USERS_CREATE_ERROR = 'USERS_CREATE_ERROR';

export const USERS_UPDATE_START = 'USERS_UPDATE_START';
export const USERS_UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
export const USERS_UPDATE_ERROR = 'USERS_UPDATE_ERROR';

export const USERS_DELETE_START = 'USERS_DELETE_START';
export const USERS_DELETE_SUCCESS = 'USERS_DELETE_SUCCESS';
export const USERS_DELETE_ERROR = 'USERS_DELETE_ERROR';


// ------------------------------------
// Actions
// ------------------------------------

export function fetchStart (): Action {
  return {
    type: USERS_FETCH_START,
  }
}

export function fetchSuccess (records): Action {
  return {
    type:    USERS_FETCH_SUCCESS,
    records: records,
  }
}

export function fetchError (error): Action {
  return {
    type:  USERS_FETCH_ERROR,
    error: error,
  }
}

export function createStart (record, genId): Action {
  return {
    type:    USERS_CREATE_START,
    record:  record,
    genId:   genId,
  }
}

export function createSuccess (record, genId): Action {
  return {
    type:    USERS_CREATE_SUCCESS,
    record:  record,
    genId:   genId,
  }
}

export function createError (error, record, genId): Action {
  return {
    type:    USERS_CREATE_ERROR,
    error:   error,
    record:  record,
    genId:   genId,
  }
}

export function updateStart (record): Action {
  return {
    type:    USERS_UPDATE_START,
    record:  record,
  }
}

export function updateSuccess (record): Action {
  return {
    type:    USERS_UPDATE_SUCCESS,
    record:  record,
  }
}

export function updateError (error, record): Action {
  return {
    type:    USERS_UPDATE_ERROR,
    error:   error,
    record:  record,
  }
}

export function deleteStart (record): Action {
  return {
    type:    USERS_DELETE_START,
    record:  record,
  }
}

export function deleteSuccess (record): Action {
  return {
    type:    USERS_DELETE_SUCCESS,
    record:  record,
  }
}

export function deleteError (error, record): Action {
  return {
    type:    USERS_DELETE_ERROR,
    error:   error,
    record:  record,
  }
}

// Fired when widget should get data
export function fetchRemote (url: string): Function {
  return (dispatch: Function) => {
    dispatch(fetchStart());
    // Load data
    return fetch(url + '&method=GET', {
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

// Fired when widget should get data
export function createRemote (url: string, record: object, redirect: string = false, appendId: boolean = false): Function {
  return (dispatch: Function) => {
    const genId = cuid();
    dispatch(createStart(record, genId));
    // Compile post
    let form_data = new FormData();
    for(let key of Object.keys(record)) {
      form_data.append(key, record[key]);
    }
    // Load data
    return fetch(url + '&method=POST', {
      method: 'post',
      body: form_data,
      credentials: 'same-origin'
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
        dispatch(createSuccess(json, genId));
        if(redirect) {
          // Redirect
          hashHistory.push(appendId ? redirect + json._id : redirect);
        }
      }
      else {
        dispatch(createError(json, record, genId));
      }
    }).catch(function (error) {
      dispatch(createError(error, record, genId));
    });
  };
}

// Fired when widget should get data
export function updateRemote (url: string, record: object, redirect: string = false, appendId: boolean = false): Function {
  return (dispatch: Function) => {
    dispatch(updateStart(record));
    // Compile post
    let form_data = new FormData();
    for(let key of Object.keys(record)) {
      form_data.append(key, record[key]);
    }
    // Load data
    return fetch(url + '&method=PATCH', {
      method: 'post',
      body: form_data,
      credentials: 'same-origin'
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
        dispatch(updateSuccess(json));
        if(redirect) {
          // Redirect
          hashHistory.push(appendId ? redirect + json._id : redirect);
        }
      }
      else {
        dispatch(updateError(json, record));
      }
    }).catch(function (error) {
      dispatch(updateError(error, record));
    });
  };
}

// Fired when widget should get data
export function deleteRemote (url: string, record: object, redirect: string = false): Function {
  return (dispatch: Function) => {
    dispatch(deleteStart(record));
    // Load data
    return fetch(url + '&method=DELETE', {
      method: 'post',
      credentials: 'same-origin'
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
        dispatch(deleteSuccess(json));
        if(redirect) {
          // Redirect
          hashHistory.push(redirect);
        }
      }
      else {
        dispatch(deleteError(json, record));
      }
    }).catch(function (error) {
      dispatch(deleteError(error, record));
    });
  };
}

export const actions = {
  fetchStart,
  fetchSuccess,
  fetchError,
  createStart,
  createSuccess,
  createError,
  updateStart,
  updateSuccess,
  updateError,
  deleteStart,
  deleteSuccess,
  deleteError,
  fetchRemote,
  createRemote,
  updateRemote,
  deleteRemote,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [USERS_FETCH_START]: (state: object, action: {}): object => {
    return state;
  },
  [USERS_FETCH_SUCCESS]: (state: object, action: {records: Array}): object => {
    let records = action.records;
    // Try to combine
    if(state && state.length) {
      return uniqueArr(state.concat(records), '_id');
    }
    // just return
    return action.records;
  },
  [USERS_FETCH_ERROR]: (state: object, action: {error: object}): object => {
    // @todo log error ?
    return state;
  },
  [USERS_CREATE_START]: (state: object, action: {record: object, genId: string}): object => {
    let { record, genId } = action;
    // optimistic update
    record = Object.assign({}, record, {
      _id: genId,
      unsaved: true,
      busy:    true
    });
    return state.concat([record]);
  },
  [USERS_CREATE_SUCCESS]: (state: object, action: {record: object, genId: string}): object => {
    let { record, genId } = action, done = false, updatedState;
    updatedState = state.map(rec => {
      // mark record as unsaved and busy
      if(rec._id === genId) {
        done = true;
        return record;
      }
      return rec;
    });
    return done ? updatedState : state.concat([record]);
  },
  [USERS_CREATE_ERROR]: (state: object, action: {error: object, record: object, genId: string}): object => {
    let { record, genId } = action;
    // @todo log error ?
    return state.map(rec => {
      // mark record as unsaved and busy
      if(rec._id === genId) {
        record = Object.assign({}, record, {
          unsaved: true,
          busy:    false,
          error:   'create'
        });
        return record;
      }
      return rec;
    });
  },
  [USERS_UPDATE_START]: (state: object, action: {record: object}): object => {
    let record = action.record;
    return state.map(rec => {
      // mark record as unsaved and busy
      if(rec._id === record._id) {
        record = Object.assign({}, record, {
          unsaved: true,
          busy:    true
        });
        return record;
      }
      return rec;
    });
  },
  [USERS_UPDATE_SUCCESS]: (state: object, action: {record: object}): object => {
    let record = action.record;
    return state.map(rec => {
      // mark record as unsaved and busy
      return rec._id === record._id ? record : rec;
    });
  },
  [USERS_UPDATE_ERROR]: (state: object, action: {error: object, record: object}): object => {
    let record = action.record;
    // @todo log error ?
    return state.map(rec => {
      // mark record as unsaved and busy
      if(rec._id === record._id) {
        record = Object.assign({}, record, {
          unsaved: true,
          busy:    false,
          error:   'update'
        });
        return record;
      }
      return rec;
    });
  },
  [USERS_DELETE_START]: (state: object, action: {record: object}): object => {
    let record = action.record;
    return state.map(rec => {
      // mark record as unsaved and busy
      if(rec._id === record._id) {
        record = Object.assign({}, record, {
          deleted: true,
          busy:    true
        });
        return record;
      }
      return rec;
    });
  },
  [USERS_DELETE_SUCCESS]: (state: object, action: {record: object}): object => {
    let record = action.record;
    return state.filter(rec => {
      return rec._id !== record._id;
    });
  },
  [USERS_DELETE_ERROR]: (state: object, action: {error: object, record: object}): object => {
    let record = action.record;
    // @todo log error ?
    return state.map(rec => {
      // mark record as unsaved and busy
      if(rec._id === record._id) {
        record = Object.assign({}, record, {
          deleted: false,
          busy:    false,
          error:   'delete'
        });
        return record;
      }
      return rec;
    });
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
