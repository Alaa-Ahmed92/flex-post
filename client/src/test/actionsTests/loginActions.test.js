
import { loginUser } from '../../actions/loginActions';
import * as types from '../../constants/loginConsts';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from 'nock';

const API_URL = `${process.env.REACT_APP_API_URL}`;
export const mockStore = configureMockStore([thunk]);


describe('Login Actions tests', () => {
    // afterEach(() => {
    //     nock.cleanAll()
    // });
    // it('creates AUTH_USER action when user is logged in', () => {
    //     nock(API_URL)
    //         .post('/signin')
    //         .reply(400, { data: { error: 404 } })

    //     const expectedActions = [
    //         { type: types.loginConstants.LOGIN_FAILURE }
    //     ];

    //     const store = mockStore({});

    //     return store.dispatch(loginUser({ email: 'example@x.com', password: 'password' })).then(() => {
    //         expect(store.getActions()).toEqual(expectedActions)
    //     })

    // });

    it('error AUTH_USER action when user is logged in', () => {
        // const user = {
        //     token: 'sssss',
        //     user: {
        //         _id: "624592588d725a65f",
        //         name: "Test Name",
        //         email: "test@test.com"
        //     },
        //     message: "You Have Successfully Logged in!"
        // }

        // jest.spyOn(global, 'fetch');

        // global.fetch.mockResolvedValue({ ok: true, json: () => user });

        // const expectedActions = [
        //     { type: types.loginConstants.LOGIN_REQUEST },
        //     {
        //         type: types.loginConstants.LOGIN_SUCCESS,
        //         user
        //     }
        // ];

        const expectedActions = [
            { type: types.loginConstants.LOGIN_SUCCESS }
        ]

        nock(API_URL)
            .post('/signin', { email: 'example@x.com', password: 'password' })
            .reply(200, { id: '123ABC' })

        const store = mockStore({});

        return store.dispatch(loginUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    });

});
