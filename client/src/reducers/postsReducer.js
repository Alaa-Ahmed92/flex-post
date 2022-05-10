import { postsConstants } from "../constants/postsConsts";

export const postsReducer = (state = {}, action) => {
    switch (action.type) {
        // Fetch Posts
        case postsConstants.FETCH_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case postsConstants.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.posts.posts,
                error: '',
            }
        case postsConstants.FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Create Post
        case postsConstants.CREATE_POST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case postsConstants.CREATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                post: action.post,
                data: action.updatedPosts,
                error: ''
            }
        case postsConstants.CREATE_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Delete Post
        case postsConstants.DELETE_POST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case postsConstants.DELETE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                post: action.post,
                data: action.updatedPosts,
                error: ''
            }
        case postsConstants.DELETE_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Update Post
        case postsConstants.UPDATE_POST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case postsConstants.UPDATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                post: action.post,
                data: action.updatedPosts,
                error: ''
            }
        case postsConstants.UPDATE_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Fetch User Posts
        case postsConstants.FETCH_USER_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case postsConstants.FETCH_USER_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.updatedPosts
            }
        case postsConstants.FETCH_USER_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Default Values
        default:
            return state;
    }
};

// export const createPostReducer = (state = {}, action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };

// export const postsByUserReducer = (state = {}, action) => {
//     switch (action.type) {
//         case postsConstants.FETCH_USER_POSTS_REQUEST:
//             return {
//                 requesting: true,
//             }
//         case postsConstants.FETCH_USER_POSTS_SUCCESS:
//             return {
//                 requesting: false,
//                 data: action.posts
//             }
//         case postsConstants.FETCH_USER_POSTS_FAILURE:
//             return {
//                 requesting: false,
//                 error: action.error
//             }
//         default:
//             return state;
//     }
// };

// export const deletePostReducer = (state = {}, action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };