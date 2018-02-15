import Adapter from 'enzyme-adapter-react-15';
import React from 'react'
import StepFour from '../steps/StepFour'
import { shallow, configure } from 'enzyme'

configure({ adapter: new Adapter() });

it('correct display of meals', () => {
    const wrapper = shallow(<StepFour previousValues={{meals: {'Cheese Burger': 3, 'Ham Burger': 5}}}/>)
    expect(wrapper.containsAllMatchingElements([
        <p>Cheese Burger x 3</p>,
        <p>Ham Burger x 5</p>
        ])).toEqual(true)
})