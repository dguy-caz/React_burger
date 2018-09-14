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
    setTimeout(() => {
      dispatch(authLogOut());
    }, timeout * 1000);
  }
};

export const authLogOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authCheckLocalStorage = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token)
      dispatch(authLogOut());
    else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        dispatch(authDone(token, localStorage.getItem('userId')))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
      else
        dispatch(authLogOut());
    }
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
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.locaId);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authDone(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      })
  };
};
