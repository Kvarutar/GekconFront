import {combineReducers} from "redux";
import session from "./session";
import filter from "./filter";

const rootReducer = combineReducers({
    session,
    filter
})

export default rootReducer;
