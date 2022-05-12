import { postsConstants } from "../constants/postsConsts";

export const getPosts = () => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/posts`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
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
    function request() { return { type: postsConstants.FETCH_POSTS_REQUEST } };
    function success(posts) { return { type: postsConstants.FETCH_POSTS_SUCCESS, posts } };
    function failure(error) { return { type: postsConstants.FETCH_POSTS_FAILURE, error } };
};


export const createPost = (id, token, post) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/posts/new/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: post
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
    function request() { return { type: postsConstants.CREATE_POST_REQUEST } };
    function success(post) { return { type: postsConstants.CREATE_POST_SUCCESS, post } };
    function failure(error) { return { type: postsConstants.CREATE_POST_FAILURE, error } };
};

export const postsByUser = (id, token) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/posts/by/${id}`, {
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
    function request() { return { type: postsConstants.FETCH_USER_POSTS_REQUEST } };
    function success(posts) { return { type: postsConstants.FETCH_USER_POSTS_SUCCESS, posts } };
    function failure(error) { return { type: postsConstants.FETCH_USER_POSTS_FAILURE, error } };
};

export const deletePost = (id, token) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/post/${id}`, {
            method: 'DELETE',
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
                    dispatch(success(data.post));
                }
            })
    }
    function request() { return { type: postsConstants.DELETE_POST_REQUEST } };
    function success(post) { return { type: postsConstants.DELETE_POST_SUCCESS, post } };
    function failure(error) { return { type: postsConstants.DELETE_POST_FAILURE, error } };
};

export const updatePost = (postId, token, post) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: post
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
    function request() { return { type: postsConstants.UPDATE_POST_REQUEST } };
    function success(post) { return { type: postsConstants.UPDATE_POST_SUCCESS, post } };
    function failure(error) { return { type: postsConstants.UPDATE_POST_FAILURE, error } };
};


export const likePost = (userId, token, postId) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/posts/post/like`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, postId })
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
    function request() { return { type: postsConstants.LIKE_POST_REQUEST } };
    function success(post) { return { type: postsConstants.LIKE_POST_SUCCESS, post } };
    function failure(error) { return { type: postsConstants.LIKE_POST_FAILURE, error } };
};

export const unlikePost = (userId, token, postId) => {
    return (dispatch) => {
        dispatch(request());
        fetch(`${process.env.REACT_APP_API_URL}/posts/post/unlike`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, postId })
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
    function request() { return { type: postsConstants.UNLIKE_POST_REQUEST } };
    function success(post) { return { type: postsConstants.UNLIKE_POST_SUCCESS, post } };
    function failure(error) { return { type: postsConstants.UNLIKE_POST_FAILURE, error } };
};