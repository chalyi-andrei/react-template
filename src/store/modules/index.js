// @flow
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import example from "./example";
import users from "./users/users";
import auth from "./auth/auth";

export default combineReducers({
  users,
  example,
  auth,
  routing: routerReducer
});
