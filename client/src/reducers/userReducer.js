import { userConstants } from "../constants/userConsts";

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.USER_REQUEST:
            return {
                requesting: true,
            }
        case userConstants.USER_SUCCESS:
            return {
                requesting: false,
                data: action.user
            }
        case userConstants.USER_FAILURE:
            return {
                requesting: false,
                error: action.error
            }
        // Update User
        case userConstants.UPDATE_USER_REQUEST:
            return {
                requesting: true,
            }
        case userConstants.UPDATE_USER_SUCCESS:
            return {
                requesting: false,
                updated: true,
                data: action.user
            }
        case userConstants.UPDATE_USER_FAILURE:
            return {
                requesting: false,
                error: action.error
            }
        // // Follow User
        // case userConstants.FOLLOW_USER_REQUEST:
        //     return {
        //         requesting: true,
        //     }
        // case userConstants.FOLLOW_USER_SUCCESS:
        //     return {
        //         requesting: false,
        //         following: true,
        //         data: action.user
        //     }
        // case userConstants.FOLLOW_USER_FAILURE:
        //     return {
        //         following: false,
        //         requesting: false,
        //         error: action.error
        //     }
        // // Unfollow user
        // case userConstants.UNFOLLOW_USER_REQUEST:
        //     return {
        //         requesting: true,
        //     }
        // case userConstants.UNFOLLOW_USER_SUCCESS:
        //     return {
        //         requesting: false,
        //         following: false,
        //         data: action.user
        //     }
        // case userConstants.UNFOLLOW_USER_FAILURE:
        //     return {
        //         following: true,
        //         requesting: false,
        //         error: action.error
        //     }
        case userConstants.DELETE_USER:
            return {
                userDeleted: true,
            }
        default:
            return state;
    }
};