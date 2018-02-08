import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react'
import StepOne from './StepOne'
import { shallow, mount } from 'enzyme'

configure({ adapter: new Adapter() });

it('button should not be disabled if number of guests is less than 10', () => {
    const wrapper = shallow(<StepOne />)
    const inst = wrapper.instance()
    wrapper.setState({numberOfGuests: 9})
    const Button = wrapper.find('button').at(0)
    expect(Button.props().disabled).toEqual(false)
})

it('button should be disabled if number of guests is greater than 10', () => {
    const wrapper = shallow(<StepOne />)
    const inst = wrapper.instance()
    wrapper.setState({numberOfGuests: 11})
    const Button = wrapper.find('button').at(0)
    expect(Button.props().disabled).toEqual(true)    
})