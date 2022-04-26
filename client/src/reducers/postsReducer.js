import { postsConstants } from "../constants/postsConsts";

export const postsReducer = (state = {}, action) => {
    switch (action.type) {
        case postsConstants.POSTS_REQUEST:
            return {
                requesting: true,
            }
        case postsConstants.POSTS_SUCCESS:
            return {
                requesting: false,
                data: action.posts.posts
            }
        case postsConstants.POSTS_FAILURE:
            return {
                requesting: false,
                error: action.error
            }
        default:
            return state;
    }
};