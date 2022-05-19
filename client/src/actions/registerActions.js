import { registerConstants } from "../constants/registerConsts";

// Register User
export const registerUser = (user) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(user => {
                if (user.error) {
                    dispatch(failure(user.error));
                } else {
                    dispatch(success(user));
                }
            })
    }
    function request() { return { type: registerConstants.REGISTER_REQUEST } };
    function success(user) { return { type: registerConstants.REGISTER_SUCCESS, user } };
    function failure(error) { return { type: registerConstants.REGISTER_FAILURE, error } };
};