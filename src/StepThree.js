import React, { Component } from 'react';
import data from './data/dishes.json' 

class StepThree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      meals: [], // going to be array of key value pairs {meal:serving}
      currentMeal: null,
      currentServing: null
    };
  }


  render() {

    const test = this.props.previousValues
    console.log("test", test)
    // passes restaurant but lost other values
    const availableMeals = data.dishes.filter(o => o.restaurant === this.props.previousValues.restaurant)
    console.log(availableMeals)

    // initilize this.state.meals because we already know which meals are allowed 
    for (let i = 0; i < availableMeals.length; i++) {
      let temp = {}
      temp[availableMeals[i].name] = null
      this.state.meals.push(temp)
    }
    console.log(this.state.meals)
    // [ {Steak: null}, {Piman: null} ]

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
      </form>
    );
  }
}

export default StepThree;
