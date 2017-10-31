import { combineReducers } from 'redux';
import registrationReducer from './register';
import authenticationReducer from './authentication';
import postsReducer from './posts';

const rootReducer = combineReducers({
  registrationReducer, 
  authenticationReducer,
  postsReducer,
});

export default rootReducer;