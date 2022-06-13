import { chatConstants } from "../constants/chatConsts";

// Get All Conversations
export const getConversations = (userId, token) => {
    return async (dispatch) => {
        dispatch(request());
        await fetch(`${process.env.REACT_APP_API_URL}/conversations/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch(failure(data.error));
                } else {
                    dispatch(success(data));
                }
            })
    }
    function request() { return { type: chatConstants.FETCH_CONVERSATIONS_REQUEST } };
    function success(conversations) { return { type: chatConstants.FETCH_CONVERSATIONS_SUCCESS, conversations } };
    function failure(error) { return { type: chatConstants.FETCH_CONVERSATIONS_FAILURE, error } };
};