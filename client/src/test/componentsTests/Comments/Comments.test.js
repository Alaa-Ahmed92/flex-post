import React, { Profiler } from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Comments from '../../../components/Comments/Comments';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Comments Component', () => {
    it('Test renders', () => {
        const wrapper = shallow(<Provider store={store}><Comments /></Provider>);
        expect(wrapper.exists()).toBe(true);
    });
    it('Test renders', () => { });
    it('Test renders', () => { });
    it('Test renders', () => { });
    it('Test renders', () => { });
    it('Test renders', () => { });
    it('Test renders', () => { });
    it('Test renders', () => { });
    it('Test renders', () => { });
    it('Test renders', () => { });
    it('Test renders', () => { });
});