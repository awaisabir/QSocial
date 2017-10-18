import axios from 'axios';

export const register = (username, password, email, firstName, lastName) => {
  return {
    type: 'REGISTRATION',
    payload: axios.post('http://localhost:4200/auth/register', {username, password, email, firstName, lastName})
  };
};

export const login = (username, password) => {
  return {
    type: 'AUTHENTICATION',
    payload: axios.post('http://localhost:4200/auth/login', {username, password})
  };
};

export const tokenValidity = token => {
  return {
    type: 'TOKEN_VALIDITY',
    payload: axios.get('http://localhost:4200/auth/authorize', {headers: {Authorization: token}})
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: {
      loggedIn: false,
    }
  };
};