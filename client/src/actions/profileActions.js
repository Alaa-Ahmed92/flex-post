import { userConstants } from "../constants/userConsts";
import { logoutUser } from './loginActions';
import { updateUserLocal, checkFollow } from '../helpers/auth-helper';

// Get All Posts
export const getUsers = () => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/users`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
    function request() { return { type: userConstants.FETCH_USERS_REQUEST } };
    function success(users) { return { type: userConstants.FETCH_USERS_SUCCESS, users } };
    function failure(error) { return { type: userConstants.FETCH_USERS_FAILURE, error } };
};

// Get User
export const getUser = (id, token) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch(failure(data.error));
                } else {
                    let following = checkFollow(data);
                    dispatch(success(data, following));
                }
            })
    }
    function request() { return { type: userConstants.FETCH_USER_REQUEST } };
    function success(user, following) { return { type: userConstants.FETCH_USER_SUCCESS, user, following } };
    function failure(error) { return { type: userConstants.FETCH_USER_FAILURE, error } };
};

// Update User
export const updateUser = (id, token, user) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: user
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch(failure(data.error));
                } else {
                    updateUserLocal(data);
                    dispatch(success(data));
                }
            })
    }
    function request() { return { type: userConstants.UPDATE_USER_REQUEST } };
    function success(user) { return { type: userConstants.UPDATE_USER_SUCCESS, user } };
    function failure(error) { return { type: userConstants.UPDATE_USER_FAILURE, error } };
};

// Delete User
export const deleteUser = (id, token) => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
        }).then(res => res.json())
        dispatch(request());
        dispatch(logoutUser());
    }
    function request() { return { type: userConstants.DELETE_USER } };
}

// Find People
export const findPeople = (id, token) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/users/findPeople/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
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
    function request() { return { type: userConstants.FIND_PEOPLE_REQUEST } };
    function success(people) { return { type: userConstants.FIND_PEOPLE_SUCCESS, people } };
    function failure(error) { return { type: userConstants.FIND_PEOPLE_FAILURE, error } };
};

// Follow User
export const followUser = (id, token, followId) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/users/user/follow`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify({ id, followId })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch(failure(data.error));
                } else {
                    let following = true;
                    dispatch(success(data, following));
                }
            })
    }
    function request() { return { type: userConstants.FOLLOW_USER_REQUEST } };
    function success(user, following) { return { type: userConstants.FOLLOW_USER_SUCCESS, user, following } };
    function failure(error) { return { type: userConstants.FOLLOW_USER_FAILURE, error } };
}

// Unfollow User
export const unFollowUser = (id, token, unfollowId) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/users/user/unfollow`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify({ id, unfollowId })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch(failure(data.error));
                } else {
                    let following = false;
                    dispatch(success(data, following));
                }
            })
    }
    function request() { return { type: userConstants.UNFOLLOW_USER_REQUEST } };
    function success(user, following) { return { type: userConstants.UNFOLLOW_USER_SUCCESS, user, following } };
    function failure(error) { return { type: userConstants.UNFOLLOW_USER_FAILURE, error } };
}