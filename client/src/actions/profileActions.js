import { userConstants } from "../constants/userConsts";
import { logoutUser } from './loginActions';
import { isAuthenticated, updateUserLocal } from '../helpers/auth-helper';

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
                    dispatch(success(data));
                }
            })
    }
    function request() { return { type: userConstants.FETCH_USER_REQUEST } };
    function success(user) { return { type: userConstants.FETCH_USER_SUCCESS, user } };
    function failure(error) { return { type: userConstants.FETCH_USER_FAILURE, error } };
};

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

// export const followUser = (id, token, followId) => {
//     return (dispatch) => {
//         dispatch(request());
//         fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
//             method: 'PUT',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`

//             },
//             body: id, followId
//         }).then(res => res.json())
//             .then(data => {
//                 if (data.error) {
//                     dispatch(failure(data.error));
//                 } else {
//                     dispatch(success(data));
//                 }
//             })
//     }
//     function request() { return { type: userConstants.FOLLOW_USER_REQUEST } };
//     function success(follow) { return { type: userConstants.FOLLOW_USER_SUCCESS, follow } };
//     function failure(error) { return { type: userConstants.FOLLOW_USER_FAILURE, error } };
// }

// export const unFollowUser = (id, token, unFollowId) => {
//     return (dispatch) => {
//         dispatch(request());
//         fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
//             method: 'PUT',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`

//             },
//             body: id, unFollowId
//         }).then(res => res.json())
//             .then(data => {
//                 if (data.error) {
//                     dispatch(failure(data.error));
//                 } else {
//                     dispatch(success(data));
//                 }
//             })
//     }
//     function request() { return { type: userConstants.UNFOLLOW_USER_REQUEST } };
//     function success(follow) { return { type: userConstants.UNFOLLOW_USER_SUCCESS, follow } };
//     function failure(error) { return { type: userConstants.UNFOLLOW_USER_FAILURE, error } };
// }