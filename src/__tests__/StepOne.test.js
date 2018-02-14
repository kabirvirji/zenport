import Adapter from 'enzyme-adapter-react-15';
import React from 'react'
import StepOne from '../steps/StepOne'
import sinon from 'sinon'
import { shallow, mount, configure } from 'enzyme'

configure({ adapter: new Adapter() });

it('button should not be disabled if number of guests is less than 10', () => {
    const wrapper = shallow(<StepOne />)
    const input = wrapper.find('input')
    input.simulate('change', {target: {name: "numberOfGuests", value: 9 }})
    const Button = wrapper.find('button').at(0)
    expect(Button.props().disabled).toEqual(false) 
})

it('button should be disabled if number of guests is greater than 10', () => {
    const wrapper = shallow(<StepOne />)
    const input = wrapper.find('input')
    input.simulate('change', {target: {name: "numberOfGuests", value: 11 }})
    const Button = wrapper.find('button').at(0)
    expect(Button.props().disabled).toEqual(true)   
})