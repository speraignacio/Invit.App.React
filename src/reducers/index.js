import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userEventReducer from "./userEventReducer";

export default combineReducers({
  auth: authReducer,
  events: userEventReducer,
});
