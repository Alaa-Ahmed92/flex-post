import { registerConstants } from "../constants/registerConsts";

export const registerReducer = (state = {}, action) => {
    switch (action.type) {
        case registerConstants.REGISTER_REQUEST:
            return {
                registering: true,
                registered: false,
            }
        case registerConstants.REGISTER_SUCCESS:
            return {
                registered: true,
                registering: false,
                user: action.user
            }
        case registerConstants.REGISTER_FAILURE:
            return {
                registered: false,
                registering: false,
                error: action.error
            }
        default:
            return state;
    }
};