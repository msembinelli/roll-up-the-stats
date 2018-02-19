/* eslint-disable */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import resetPasswordReducer from './resetPasswordReducer';
import entryReducer from './entryReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  resetPass: resetPasswordReducer,
  entry: entryReducer
});

export default rootReducer;
