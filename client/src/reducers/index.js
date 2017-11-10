import { combineReducers } from 'redux';
import registrationReducer from './register';
import authenticationReducer from './authentication';
import postsReducer from './posts';
import postReducer from './post';

const rootReducer = combineReducers({
  registrationReducer, 
  authenticationReducer,
  postsReducer,
  postReducer,
});

export default rootReducer;