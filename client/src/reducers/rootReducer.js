import { combineReducers } from "redux";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { postsReducer } from "./postsReducer";

export const rootReducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
    posts: postsReducer
});