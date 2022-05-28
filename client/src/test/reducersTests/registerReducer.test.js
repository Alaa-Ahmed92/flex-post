import * as types from "../../constants/registerConsts";
import { registerReducer } from '../../reducers/registerReducer';

describe('Register Reducer', () => {

    const user = {
        name: 'test name',
        email: 'test@test.com',
        password: '383487263262'
    };

    it('Should return the inital state', () => {
        // Act
        const reducer = registerReducer(undefined, {});

        // Assert
        expect(reducer).toEqual({});
    });

    it('Should handle REGISTER_REQUEST', () => {
        // Arrange
        const action = { type: types.registerConstants.REGISTER_REQUEST };
        const initalState = {
            registering: true,
            registered: false
        };

        // Act
        const reducer = registerReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle REGISTER_SUCCESS', () => {
        // Arrange
        const action = { type: types.registerConstants.REGISTER_SUCCESS, user };
        const initalState = {
            registered: true,
            registering: false,
            user
        };

        // Act
        const reducer = registerReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });
    it('Should handle REGISTER_FAILURE', () => {
        // Arrange
        const action = { type: types.registerConstants.REGISTER_FAILURE, error: "Error Message" };
        const initalState = {
            registered: false,
            registering: false,
            error: "Error Message"
        };

        // Act
        const reducer = registerReducer(initalState, action);

        // Assert
        expect(reducer).toEqual(initalState);
    });

});