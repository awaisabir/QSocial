import decode from 'jwt-decode';
import { tokenValidity } from '../actions/index';

export default token => {
  if (!token || token == 'undefined') {
    return {status: false, data: {}};
  } else {
    try {
      let data = decode(token);

      if (data.exp < new Date().getTime()/1000)
        return {status: true, data: {}};    

      return {status: true, data};
    } catch (err) {
      return {status: false, data: {}};    
    }
  }
}