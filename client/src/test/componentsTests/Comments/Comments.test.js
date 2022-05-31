import React, { Profiler } from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Comments from '../../../components/Comments/Comments';
import CreateComment from '../../../components/Comments/CreateComment';
import { shallowToJson } from 'enzyme-to-json';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Comments Component', () => {
    let wrapper;

    it('renders without crashing', () => {
        wrapper = shallow(<Provider store={store}><Comments /></Provider>);
    });

    it('matches snapshot', () => {
        wrapper = shallow(<Provider store={store}><Comments /></Provider>);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});