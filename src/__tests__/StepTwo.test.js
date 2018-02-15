import Adapter from 'enzyme-adapter-react-15';
import React from 'react'
import StepTwo from '../steps/StepTwo'
import sinon from 'sinon'
import { shallow, mount, configure } from 'enzyme'

configure({ adapter: new Adapter() });

it('breakfast restaurants', () => {
    const wrapper = shallow(<StepTwo previousValues={{mealTime: 'breakfast'}}/>)
    expect(wrapper.containsAllMatchingElements([
        <option>Mc Donalds</option>,
        <option>Vege Deli</option>,
        <option>Olive Garden</option>
        ])).toEqual(true)
})

it('lunch restaurants', () => {
    const wrapper = shallow(<StepTwo previousValues={{mealTime: 'lunch'}}/>)
    expect(wrapper.containsAllMatchingElements([
        <option>Mc Donalds</option>,
        <option>Taco Bell</option>,
        <option>Vege Deli</option>,
        <option>Pizzeria</option>,
        <option>Panda Express</option>,
        <option>Olive Garden</option>
        ])).toEqual(true)
})

it('dinner restaurants', () => {
    const wrapper = shallow(<StepTwo previousValues={{mealTime: 'dinner'}}/>)
    expect(wrapper.containsAllMatchingElements([
        <option>Mc Donalds</option>,
        <option>Taco Bell</option>,
        <option>BBQ Hut</option>,
        <option>Vege Deli</option>,
        <option>Pizzeria</option>,
        <option>Panda Express</option>,
        <option>Olive Garden</option>
        ])).toEqual(true)
})