import * as actionTypes from '../actions/actionTypes';

const firstState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const reducer = (state = firstState, action) => {
  if (action.type === actionTypes.AUTH_INIT) {
    return {
      ...state,
      error: null,
      loading: true
    };
  }
  else if (action.type === actionTypes.AUTH_DONE) {
    return {
      token: action.idToken,
      userId: action.userId,
      error: null,
      loading: false
    };
  }
  else if (action.type === actionTypes.AUTH_FAIL) {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }
  else if (action.type === actionTypes.AUTH_LOGOUT) {
    return {
      ...state,
      token: null,
      userId: null
    }
  }
  else
    return state;
}

export default reducer;
