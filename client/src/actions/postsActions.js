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
    function request() { return { type: postsConstants.POSTS_REQUEST } };
    function success(posts) { return { type: postsConstants.POSTS_SUCCESS, posts } };
    function failure(error) { return { type: postsConstants.POSTS_FAILURE, error } };
};