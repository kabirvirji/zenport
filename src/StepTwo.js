import React, { Component } from 'react';
import './App.css';
import { FormErrors } from './FormErrors'
import data from './data/dishes.json' 

class StepTwo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant : '',
      formValid: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    console.log("CONSTRUCTOR PROPS", this.props)
    //this.filterData = this.filterData.bind(this);
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("name", name)
    console.log("value", value)
    this.setState({
        [name]: value,
        formValid: true
      }
    );
    this.props.saveValues(this.restaurant, value)
    // console.log(this.state.restaurant)
    // if (this.state.restaurant !== '') {
    //   this.setState({formValid: true});
    // }
  }

  render() {
    console.log("in render", this.props)
    // number can get negative
    // form required fields
    // no previous step for this form
    const meal = this.props.previousValues.mealTime
    let result = []
    console.log(data)
    let dishes = data.dishes
    for (let dish = 0; dish < data.dishes.length; dish++) {
      for (let i = 0; i < dishes[dish].availableMeals.length; i++) {
        console.log(dishes[dish].availableMeals[i])
        if (dishes[dish].availableMeals[i] === meal) {
          result.push(dishes[dish].id)
        }
      }
    }
    // result contains the id's of the dishes to display in the drop down
    console.log("result", result)

    return (
      <form>
          <select
            name="restaurant"
            onChange={this.handleInputChange} >
              {data.dishes.map(element => <option value={element.restaurant}>{element.restaurant}</option>)}
          </select>
        <br />
        <button onClick={ this.previousStep }>previous</button>
        <button onClick={ this.nextStep } disabled={!this.state.formValid}>Save and Continue</button>
      </form>
    );
  }
}

export default StepTwo;
