import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DividerWithTitle from '../../../components/antdDivider/DividerWithTitle';

let props = {
    title: 'Comments'
};

const setUpComponent = () => {
    const component = shallow(<DividerWithTitle {...props} />);
    return component;
}

describe('DividerWithTitle component', () => {

    let component;
    beforeEach(() => {
        component = setUpComponent();
    });

    it('Should render the same with given props', () => {
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});