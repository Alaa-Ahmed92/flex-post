import { chatConstants } from "../constants/chatConsts";

const initalState = {
    loading: false,
    conversations: [],
    error: null
}

export const chatReducer = (state = initalState, action) => {
    switch (action.type) {
        // Fetch User Posts
        case chatConstants.FETCH_CONVERSATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case chatConstants.FETCH_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                conversations: action.conversations,
                error: '',
            }
        case chatConstants.FETCH_CONVERSATIONS_FAILURE:
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