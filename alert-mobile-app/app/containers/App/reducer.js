/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';

// The initial state of the App
export const initialState = {
  loading: false,
  isLoading: false,
  error: false,
  userData: {
    repositories: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'LOGIN_USER':
        draft.user = action.user;
        break;
      case 'REALM_CONNECTION':
        draft.realmConnection = action.realmConnection
        break;
      case 'REALM_USER_ID':
        draft.realmUserId = action.realmUserId
        break;
      case 'REALM_USER_EMAIL':
        draft.realmUserEmail = action.realmUserEmail
        break;
      case 'GET_SENSORS':
        draft.sensors = action.sensors;
        break;
      case 'SET_LOADING':
        draft.isLoading = action.isLoading;
        break;
      case 'LOGOUT':
        draft.realmUserId = null;
        draft.realmConnection = null;
        break;
    }
  });

export default appReducer;
