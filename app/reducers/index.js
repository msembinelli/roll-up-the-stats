/* eslint-disable */
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import authReducer from "./authReducer";
import resetPasswordReducer from "./resetPasswordReducer";
import entryReducer from "./entryReducer";
import statReducer from "./statReducer";

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  resetPass: resetPasswordReducer,
  entry: entryReducer,
  stats: statReducer
});

export default rootReducer;
