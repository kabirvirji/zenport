import React, { Component } from 'react';
import data from './data/dishes.json' 

class StepThree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      meals: {}, // going to be key value pairs {meal:serving, meal:serving}
      currentMeal: null,
      currentServing: null,
      totalDishes: 0,
      validNumber: false
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.saveInput = this.saveInput.bind(this);
    //this.addItem = this.saveItem.bind(this);
  }

  render() {

    const test = this.props.previousValues
    console.log("test", test)
    // passes restaurant but lost other values
    const availableMeals = data.dishes.filter(o => o.restaurant === this.props.previousValues.restaurant)
    console.log(availableMeals)

    // initilize this.state.meals because we already know which meals are allowed 
    for (let i = 0; i < availableMeals.length; i++) {
      this.state.meals[availableMeals[i].name] = null
    }
    console.log(this.state.meals)

    return (
      <form>
        <select
          name="meal"
        >
          {availableMeals.map(element => <option value={element.name}>{element.name}</option>)}
        </select>
        <input
          name="numberOfGuests"
          type="number"
          min="1"
          value={this.state.servings}
          onChange={this.handleInputChange} 
        />
        <h3>Please enter more than {this.props.previousValues.numberOfGuests} meals</h3>
        <h3>Current total meal(s) : {this.state.totalDishes}</h3>
        <button onClick={ this.addItem }>add item</button>
        <button onClick={ this.props.previousStep }>previous</button>
        <button onClick={ this.saveInput } disabled={!this.state.validNumber}>Save and Continue</button>
      </form>
    );
  }
}

export default StepThree;
