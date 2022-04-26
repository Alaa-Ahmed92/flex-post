import { loginConstants } from "../constants/loginConsts";
import { authenticate } from '../helpers/auth-helper';

export const loginUser = (user) => {
    return (dispatch) => {
        dispatch(request(user));
        fetch(`${process.env.REACT_APP_API_URL}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch(failure(data.error));
                } else {
                    authenticate(data, () => {
                        dispatch(success(data));
                    });
                }
            })
    }
    function request(user) { return { type: loginConstants.LOGIN_REQUEST, user } };
    function success(user) { return { type: loginConstants.LOGIN_SUCCESS, user } };
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } };
};

export const logoutUser = () => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_URL}/signout/`, {
            method: 'GET',
        }).then(res => res.json())
        dispatch(request());
        window.localStorage.removeItem('jwt');
    }
    function request() { return { type: loginConstants.SIGNOUT } };
};