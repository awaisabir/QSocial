import decode from 'jwt-decode';
import { tokenValidity } from '../actions/index';

export const isTokenExpired = token => {
  if (!token || token === 'undefined')
    return true;

  try {
    let { exp } = decode(token);

    if (exp < new Date().getTime() / 1000)
      return true;
    
    let user = decode(token);
    return user;
  } catch (err) {
    return true;
  }
}