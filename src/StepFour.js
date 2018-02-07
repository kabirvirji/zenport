import React, { Component } from 'react';
import './App.css';
import { FormErrors } from './FormErrors'
import data from './data/dishes.json' 

class StepFour extends Component {

  display = () => {
    console.log(this.props.previousValues)
  }

  render() {

    const allMeals = this.props.previousValues.meals // object
    const guests = this.props.previousValues.numberOfGuests // number
    const restaurant = this.props.previousValues.restaurant
    const mealTime = this.props.previousValues.mealTime

    return (

      <div>
        {JSON.stringify(allMeals)}
        <br />
        {guests}
        <br />
        {restaurant}
        <br />
        {mealTime}
        <button onClick={ this.display }>previous</button>
      </div>

    );
  }
}

export default StepFour;
