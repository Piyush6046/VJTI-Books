import {combineReducers} from 'redux';
import postReducer from './postReducer'
import authReducer from './authReducer';
import convReducer from './convReducer';

export default combineReducers({
  posts:postReducer,
  auth:authReducer,
  conversations:convReducer,
})