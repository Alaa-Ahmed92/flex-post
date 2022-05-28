import * as types from '../../constants/loginConsts';
import { loginReducer } from '../../reducers/loginReducer';

describe('Login reducer tests', () => {
    it('should return the initial state', () => {
        // Act
        const reducer = loginReducer(undefined, {});

        // Assert
        expect(reducer).toEqual({});
    });
    it('should handle LOGIN_REQUEST', () => {
        // Arrange
        const action = { type: types.loginConstants.LOGIN_REQUEST };
        const initalState = { requesting: true };

        // Act
        const reducer = loginReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('should handle LOGIN_SUCCESS', () => {
        // Arrange
        const user = {
            _id: '383487263262',
            name: 'test name',
            email: 'test@test.com'
        };
        const action = { type: types.loginConstants.LOGIN_SUCCESS, user }
        const initalState = {
            requesting: false,
            loggedIn: true,
            user
        }

        // Act
        const reducer = loginReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('should handle LOGIN_FAILURE', () => {
        // Arrange
        const action = { type: types.loginConstants.LOGIN_FAILURE, error: 'Error Message' };

        const initalState = {
            requesting: false,
            loggedIn: false,
            error: 'Error Message'
        };

        // Act
        const reducer = loginReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('should handle SIGNOUT', () => {
        // Arrange
        const action = { type: types.loginConstants.SIGNOUT };

        // Act
        const reducer = loginReducer({}, action);

        // Assert
        expect(reducer).toEqual({});
    });
});