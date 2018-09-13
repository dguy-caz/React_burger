import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT,
  };
};

export const authDone = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_DONE,
    idToken: idToken,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const checkAuthTimeout = timeout => {
  return dispatch => {
    console.log(timeout);
    setTimeout(() => {
      dispatch(authLogOut());
    }, timeout * 1000);
  }
};

export const authLogOut = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authentication = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authInit());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCEGw2txD7F5EnifMpWi3WtOJ5o1HN_uCk';
    if (!isSignUp)
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCEGw2txD7F5EnifMpWi3WtOJ5o1HN_uCk';
    axios.post(url, authData)
      .then(response => {
        dispatch(authDone(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      })
  };
};
