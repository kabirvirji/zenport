import Adapter from 'enzyme-adapter-react-15';
import React from 'react'
import StepThree from '../steps/StepThree'
import sinon from 'sinon'
import { shallow, configure } from 'enzyme'

configure({ adapter: new Adapter() });

it('correct dropdown', () => {
    const wrapper = shallow(<StepThree previousValues={{restaurant: 'Mc Donalds'}}/>)
    expect(wrapper.containsAllMatchingElements([
        <option>Chicken Burger</option>,
        <option>Ham Burger</option>,
        <option>Cheese Burger</option>,
        <option>Fries</option>,
        <option>Egg Muffin</option>
        ])).toEqual(true)
})

it('add meal', () => {
    const wrapper = shallow(<StepThree previousValues={{restaurant: 'Mc Donalds'}}/>)
    const select = wrapper.find('select')
    const input = wrapper.find('input')
    const Button = wrapper.find('button').at(0)
    select.simulate('change', {target: {name: "currentMeal", value: "Cheese Burger" }})
    input.simulate('change', {target: {name: "currentServing", value: 1 }})
    Button.simulate('click', {preventDefault: () => {}})
    expect(wrapper.state().meals).toEqual({'Cheese Burger': 1})
    expect(wrapper.state().totalDishes).toEqual(1)
})

it('delete meal', () => {
    const wrapper = shallow(<StepThree previousValues={{restaurant: 'Mc Donalds'}}/>)
    const select = wrapper.find('select')
    const input = wrapper.find('input')
    const Button = wrapper.find('button').at(1)
    wrapper.setState({meals: {'Cheese Burger': 3, 'Ham Burger': 2}})
    wrapper.setState({totalDishes: 5})
    select.simulate('change', {target: {name: "currentMeal", value: "Cheese Burger" }})
    input.simulate('change', {target: {name: "currentServing", value: 3 }})
    Button.simulate('click', {preventDefault: () => {}})
    expect(wrapper.state().meals).toEqual({'Cheese Burger': 0, 'Ham Burger': 2})
    expect(wrapper.state().totalDishes).toEqual(2)
})

it('button should be disabled if there are not enough meals for the guests', () => {
    const wrapper = shallow(<StepThree previousValues={{numberOfGuests: 8, restaurant: 'Mc Donalds'}}/>)
    const select = wrapper.find('select')
    const input = wrapper.find('input')
    select.simulate('change', {target: {name: "currentMeal", value: "Cheese Burger" }})
    input.simulate('change', {target: {name: "currentServing", value: 3 }})
    const Button = wrapper.find('button').at(3)
    expect(Button.props().disabled).toEqual(true) 
})
