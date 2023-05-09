import {combineReducers} from "redux";
import session from "./session";
import filter from "./filter";
import user from "./userInfo";

const rootReducer = combineReducers({
    session,
    filter,
    user
})

export default rootReducer;
