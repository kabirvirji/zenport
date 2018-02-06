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
    console.log(this.props)
    // number can get negative
    // form required fields
    // no previous step for this form
    const meal = this.props.previousValues.mealTime
    const filteredRestaurants = data.filter(i => meal in i.availableMeals)
    console.log("FILTERED", filteredRestaurants)

    return (
      <form>
          <select
            name="restaurant"
            onChange={this.handleInputChange} >

            <option value="Mcdondalds">Mcdondalds</option>
            <option value="coco curry">coco</option>
          </select>
        <br />
        <button onClick={ this.previousStep }>previous</button>
        <button onClick={ this.nextStep } disabled={!this.state.formValid}>Save and Continue</button>
      </form>
    );
  }
}

export default StepTwo;
