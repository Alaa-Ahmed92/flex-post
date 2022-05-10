import { combineReducers } from "redux";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { postsReducer, createPostReducer, postsByUserReducer, deletePostReducer } from "./postsReducer";

export const rootReducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
    posts: postsReducer,
    // createPost: createPostReducer,
    // deletePost: deletePostReducer,
    // postsByUser: postsByUserReducer
});