import { combineReducers } from "redux";
import authReducer from "./authReducer";
import propertyReducer from "./propertyReducer";
//add reducers here when created in reducer folder
export default combineReducers({
  authReducer,
  propertyReducer,
});
