import { userReducer } from '../../reducers/userReducer';
import * as types from '../../constants/userConsts';

describe('User Reducer', () => {

    const user = {
        _id: '383487263262',
        name: 'test name',
        email: 'test@test.com'
    };

    const users = [{
        _id: '383487263262',
        name: 'test name',
        email: 'test@test.com'
    }];

    it('Should return the inital state', () => {
        // Act
        const reducer = userReducer(undefined, {});

        // Assert
        expect(reducer).toEqual({});
    });
    it('Should handle FETCH_USERS_REQUEST', () => {
        // Arrange
        const action = { type: types.userConstants.FETCH_USERS_REQUEST };
        const initalState = { loading: true };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle FETCH_USERS_SUCCESS', () => {
        // Arrange
        const action = { type: types.userConstants.FETCH_USERS_SUCCESS, users }
        const initalState = {
            loading: false,
            users,
            error: '',
        }

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle FETCH_USERS_FAILURE', () => {
        // Arrange
        const action = { type: types.userConstants.FETCH_USERS_FAILURE, error: 'Error Message' };
        const initalState = {
            loading: false,
            error: 'Error Message'
        };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle FETCH_USER_REQUEST', () => {
        // Arrange
        const action = { type: types.userConstants.FETCH_USER_REQUEST };
        const initalState = { loading: true };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle FETCH_USER_SUCCESS', () => {
        // Arrange
        const following = true;
        const action = { type: types.userConstants.FETCH_USER_SUCCESS, user, following };
        const initalState = {
            loading: false,
            data: user,
            following,
            error: '',
        }

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle FETCH_USER_FAILURE', () => {
        // Arrange
        const action = { type: types.userConstants.FETCH_USER_FAILURE, error: 'Error Message' };
        const initalState = {
            loading: false,
            error: 'Error Message'
        };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle UPDATE_USER_REQUEST', () => {
        // Arrange
        const action = { type: types.userConstants.UPDATE_USER_REQUEST };
        const initalState = { loading: true };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle UPDATE_USER_SUCCESS', () => {
        // Arrange
        const action = { type: types.userConstants.UPDATE_USER_SUCCESS, user };
        const initalState = {
            loading: false,
            updated: true,
            data: user
        }

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle UPDATE_USER_FAILURE', () => {
        // Arrange
        const action = { type: types.userConstants.UPDATE_USER_FAILURE, error: 'Error Message' };
        const initalState = {
            loading: false,
            error: 'Error Message'
        };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle FOLLOW_USER_REQUEST', () => {
        // Arrange
        const action = { type: types.userConstants.FOLLOW_USER_REQUEST };
        const initalState = { loading: true };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle FOLLOW_USER_SUCCESS', () => {
        // Arrange
        const following = true;
        const action = { type: types.userConstants.FOLLOW_USER_SUCCESS, user, following };
        const initalState = {
            loading: false,
            data: user,
            following
        }

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle FOLLOW_USER_FAILURE', () => {
        // Arrange
        const action = { type: types.userConstants.FOLLOW_USER_FAILURE, error: 'Error Message' };
        const initalState = {
            loading: false,
            error: 'Error Message'
        };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle UNFOLLOW_USER_REQUEST', () => {
        // Arrange
        const action = { type: types.userConstants.UNFOLLOW_USER_REQUEST };
        const initalState = { loading: true };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle UNFOLLOW_USER_SUCCESS', () => {
        // Arrange
        const following = false;
        const action = { type: types.userConstants.UNFOLLOW_USER_SUCCESS, user, following };
        const initalState = {
            loading: false,
            data: user,
            following
        }

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle UNFOLLOW_USER_FAILURE', () => {
        // Arrange
        const action = { type: types.userConstants.UNFOLLOW_USER_FAILURE, error: 'Error Message' };
        const initalState = {
            loading: false,
            error: 'Error Message'
        };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle DELETE_USER', () => {
        // Arrange
        const following = false;
        const action = { type: types.userConstants.DELETE_USER };
        const initalState = {
            userDeleted: true
        }

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle FIND_PEOPLE_REQUEST', () => {
        // Arrange
        const action = { type: types.userConstants.FIND_PEOPLE_REQUEST };
        const initalState = { loading: true };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle FIND_PEOPLE_SUCCESS', () => {
        // Arrange
        const following = false;
        const action = { type: types.userConstants.FIND_PEOPLE_SUCCESS, people: users };
        const initalState = {
            loading: false,
            people: users
        }

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle FIND_PEOPLE_FAILURE', () => {
        // Arrange
        const action = { type: types.userConstants.FIND_PEOPLE_FAILURE, error: 'Error Message' };
        const initalState = {
            loading: false,
            error: 'Error Message'
        };

        // Act
        const reducer = userReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
});