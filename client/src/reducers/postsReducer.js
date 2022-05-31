import { postsConstants } from "../constants/postsConsts";

const initalState = {
    loading: false,
    posts: [],
    error: null
}

export const postsReducer = (state = initalState, action) => {
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
                posts: action.posts.posts,
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
                loading: false,
                posts: [action.post, ...state.posts],
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
                posts: state.posts.filter((p) => p._id !== action.post._id),
                loading: false,
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
                loading: false,
                posts: state.posts.map(p => {
                    return p._id === action.post._id ? action.post : p
                }),
                error: ''
            }
        case postsConstants.UPDATE_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Like Post
        case postsConstants.LIKE_POST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case postsConstants.LIKE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(p => {
                    if (p._id === action.post._id) {
                        return {
                            ...p,
                            likes: action.post.likes
                        }
                    }
                    return p;
                }),
                error: ''
            }
        case postsConstants.LIKE_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Unlike Post
        case postsConstants.UNLIKE_POST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case postsConstants.UNLIKE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(p => {
                    if (p._id === action.post._id) {
                        return {
                            ...p,
                            likes: action.post.likes
                        }
                    }
                    return p;
                }),
            }
        case postsConstants.UNLIKE_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Add Comment
        case postsConstants.ADD_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case postsConstants.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(p => {
                    return p._id === action.post._id ? action.post : p
                }),
                error: ''
            }
        case postsConstants.ADD_COMMENT_FAILURE:
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
                posts: action.posts,
                error: '',
            }
        case postsConstants.FETCH_USER_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Fetch User Posts
        case postsConstants.TURNOFF_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case postsConstants.TURNOFF_COMMENTS_SUCCESS:
            return {
                loading: false,
                posts: state.posts.map(p => {
                    if (p._id === action.post._id) {
                        return {
                            ...p,
                            commentsOff: !action.post.commentsOff,
                        }
                    }
                    return p;
                }),
                error: '',
            }
        case postsConstants.TURNOFF_COMMENTS_FAILURE:
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