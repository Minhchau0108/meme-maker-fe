import { combineReducers } from "redux";
import memeReducer from "./meme.reducers";
export default combineReducers({
  meme: memeReducer,
});
