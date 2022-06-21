import { userConstants } from "../constants/userConsts";

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        // Fetch Users
        case userConstants.FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userConstants.FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.users,
                error: '',
            }
        case userConstants.FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Fetch User
        case userConstants.FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userConstants.FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.user,
                following: action.following
            }
        case userConstants.FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Update User
        case userConstants.UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userConstants.UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.user
            }
        case userConstants.UPDATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Follow User
        case userConstants.FOLLOW_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userConstants.FOLLOW_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.user,
                following: action.following
            }
        case userConstants.FOLLOW_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // unFollow User
        case userConstants.UNFOLLOW_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userConstants.UNFOLLOW_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.user,
                following: action.following
            }
        case userConstants.UNFOLLOW_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Delete User
        case userConstants.DELETE_USER:
            return {
                ...state,
                userDeleted: true,
            }
        // Find People
        case userConstants.FIND_PEOPLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userConstants.FIND_PEOPLE_SUCCESS:
            return {
                ...state,
                loading: false,
                people: action.people
            }
        case userConstants.FIND_PEOPLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
};