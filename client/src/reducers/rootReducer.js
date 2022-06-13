import { combineReducers } from "redux";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { postsReducer } from "./postsReducer";
import { chatReducer } from "./chatReducer";

export const rootReducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
    posts: postsReducer,
    chat: chatReducer
});