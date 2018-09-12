import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT,
  };
};

export const authDone = authData => {
  return {
    type: actionTypes.AUTH_DONE,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authentication = (email, password) => {
  return dispatch => {
    dispatch(authInit());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCEGw2txD7F5EnifMpWi3WtOJ5o1HN_uCk', authData)
      .then(response => {
        console.log(response);
        dispatch(authDone(response.Data));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error));
      })
  };
};
