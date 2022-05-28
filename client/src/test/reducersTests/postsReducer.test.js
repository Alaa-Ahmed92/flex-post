import { postsReducer } from "../../reducers/postsReducer";
import * as types from '../../constants/postsConsts';

describe('Posts Reducer', () => {

    const initalState = {
        loading: false,
        posts: [],
        error: null
    };

    const post = {
        _id: "6286c3a09fdd3b0cc2a568f4",
        body: "ra",
        likes: [
            "6245925883095de0d725a65f"
        ],
        comments: [
            {
                text: "One",
                postedBy: {
                    _id: "6245925883095de0d725a65f",
                    name: "Eslam Ramy"
                },
                _id: "628fb5c8954ea178b09040d1",
                createdAt: "2022-05-26T17:15:52.018Z"
            }
        ],
        createdAt: "2022-05-19T22:24:32.264Z",
        postedBy: {
            _id: "62874a5252fa1cf6b6f43b3c",
            name: "Alaa Ahmed"
        }
    };

    const posts = [{
        _id: "6286c3a09fdd3b0cc2a568f4",
        body: "ra",
        likes: [
            "6245925883095de0d725a65f"
        ],
        comments: [
            {
                text: "One",
                postedBy: {
                    _id: "6245925883095de0d725a65f",
                    name: "Eslam Ramy"
                },
                _id: "628fb5c8954ea178b09040d1",
                createdAt: "2022-05-26T17:15:52.018Z"
            }
        ],
        createdAt: "2022-05-19T22:24:32.264Z",
        postedBy: {
            _id: "62874a5252fa1cf6b6f43b3c",
            name: "Alaa Ahmed"
        }
    }];

    it('Should return the inital state', () => {
        // Act
        const reducer = postsReducer(undefined, {});

        // Assert
        expect(reducer).toEqual(initalState);
    });

    it('Should handle FETCH_POSTS_REQUEST', () => {
        // Arrange
        const action = { type: types.postsConstants.FETCH_POSTS_REQUEST };
        const expectedState = { ...initalState, loading: true };

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle FETCH_POSTS_SUCCESS', () => {
        // Arrange
        const action = { type: types.postsConstants.FETCH_POSTS_SUCCESS, posts: { posts } };
        const expectedState = {
            ...initalState,
            loading: false,
            posts: posts,
            error: '',
        };

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle FETCH_POSTS_FAILURE', () => {
        // Arrange
        const action = { type: types.postsConstants.FETCH_POSTS_FAILURE, error: 'Error Message' };
        const expectedState = { ...initalState, loading: false, error: 'Error Message' }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle CREATE_POST_REQUEST', () => {
        // Arrange
        const action = { type: types.postsConstants.CREATE_POST_REQUEST };
        const expectedState = { ...initalState, loading: true }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle CREATE_POST_SUCCESS', () => {
        // Arrange
        const action = { type: types.postsConstants.CREATE_POST_SUCCESS, post };
        const expectedState = {
            ...initalState,
            posts: posts,
            loading: false,
            error: '',
        };

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle CREATE_POST_FAILURE', () => {
        // Arrange
        const action = { type: types.postsConstants.CREATE_POST_FAILURE, error: 'Error Message' };
        const expectedState = { ...initalState, loading: false, error: 'Error Message' }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle DELETE_POST_REQUEST', () => {
        // Arrange
        const action = { type: types.postsConstants.DELETE_POST_REQUEST };
        const expectedState = { ...initalState, loading: true }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle DELETE_POST_SUCCESS', () => {
        // Arrange
        const action = { type: types.postsConstants.DELETE_POST_SUCCESS, post };
        const expectedState = {
            ...initalState,
            loading: false,
            error: '',
        };

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle DELETE_POST_FAILURE', () => {
        // Arrange
        const action = { type: types.postsConstants.DELETE_POST_FAILURE, error: 'Error Message' };
        const expectedState = { ...initalState, loading: false, error: 'Error Message' }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle UPDATE_POST_REQUEST', () => {
        // Arrange
        const action = { type: types.postsConstants.UPDATE_POST_REQUEST };
        const expectedState = { ...initalState, loading: true }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle UPDATE_POST_SUCCESS', () => {
        // Arrange
        const action = { type: types.postsConstants.UPDATE_POST_SUCCESS, post };
        const expectedState = {
            ...initalState,
            loading: false,
            error: '',
        };

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle UPDATE_POST_FAILURE', () => {
        // Arrange
        const action = { type: types.postsConstants.UPDATE_POST_FAILURE, error: 'Error Message' };
        const expectedState = { ...initalState, loading: false, error: 'Error Message' }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle LIKE_POST_REQUEST', () => {
        // Arrange
        const action = { type: types.postsConstants.LIKE_POST_REQUEST };
        const expectedState = { ...initalState, loading: true }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle LIKE_POST_SUCCESS', () => {
        // Arrange
        const action = { type: types.postsConstants.LIKE_POST_SUCCESS, post };
        const expectedState = {
            ...initalState,
            loading: false,
            error: '',
        };

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle LIKE_POST_FAILURE', () => {
        // Arrange
        const action = { type: types.postsConstants.LIKE_POST_FAILURE, error: 'Error Message' };
        const expectedState = { ...initalState, loading: false, error: 'Error Message' }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle UNLIKE_POST_REQUEST', () => {
        // Arrange
        const action = { type: types.postsConstants.UNLIKE_POST_REQUEST };
        const expectedState = { ...initalState, loading: true }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle UNLIKE_POST_SUCCESS', () => {
        // Arrange
        const action = { type: types.postsConstants.UNLIKE_POST_SUCCESS, post };
        const expectedState = {
            ...initalState,
            loading: false
        };

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle UNLIKE_POST_FAILURE', () => {
        // Arrange
        const action = { type: types.postsConstants.UNLIKE_POST_FAILURE, error: 'Error Message' };
        const expectedState = { ...initalState, loading: false, error: 'Error Message' }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle ADD_COMMENT_REQUEST', () => {
        // Arrange
        const action = { type: types.postsConstants.ADD_COMMENT_REQUEST };
        const expectedState = { ...initalState, loading: true }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle ADD_COMMENT_SUCCESS', () => {
        // Arrange
        const action = { type: types.postsConstants.ADD_COMMENT_SUCCESS, post };
        const expectedState = {
            ...initalState,
            loading: false,
            error: '',
        };

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle ADD_COMMENT_FAILURE', () => {
        // Arrange
        const action = { type: types.postsConstants.ADD_COMMENT_FAILURE, error: 'Error Message' };
        const expectedState = { ...initalState, loading: false, error: 'Error Message' }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle FETCH_USER_POSTS_REQUEST', () => {
        // Arrange
        const action = { type: types.postsConstants.FETCH_USER_POSTS_REQUEST };
        const expectedState = { ...initalState, loading: true }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle FETCH_USER_POSTS_SUCCESS', () => {
        // Arrange
        const action = { type: types.postsConstants.FETCH_USER_POSTS_SUCCESS, posts };
        const expectedState = {
            ...initalState,
            loading: false,
            posts: posts,
            error: '',
        };

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
    it('Should handle FETCH_USER_POSTS_FAILURE', () => {
        // Arrange
        const action = { type: types.postsConstants.FETCH_USER_POSTS_FAILURE, error: 'Error Message' };
        const expectedState = { ...initalState, loading: false, error: 'Error Message' }

        // Act
        const reducer = postsReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(expectedState);
    });
});