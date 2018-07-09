import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./ducks/userReducer";
import projectReducer from "./ducks/projectReducer";
import taskReducer from "./ducks/taskReducer";

export default createStore(
  combineReducers({
    userReducer,
    projectReducer,
    taskReducer
  }),
  applyMiddleware(promiseMiddleware())
);
