import { combineReducers } from 'redux';
import registrationReducer from './register';
import authenticationReducer from './authentication';

const rootReducer = combineReducers({
  registrationReducer, authenticationReducer
});

export default rootReducer;