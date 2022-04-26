import { loginConstants } from "../constants/loginConsts";

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case loginConstants.LOGIN_REQUEST:
            return {
                requesting: true
            }
        case loginConstants.LOGIN_SUCCESS:
            return {
                requesting: false,
                loggedIn: true,
                user: action.user
            }
        case loginConstants.LOGIN_FAILURE:
            return {
                requesting: false,
                loggedIn: false,
                error: action.error
            }
        case loginConstants.SIGNOUT:
            return {};
        default:
            return state;
    }
};