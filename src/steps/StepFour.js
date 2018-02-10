import React, { Component } from 'react';

class StepFour extends Component {

  display = () => {
    console.log(this.props.previousValues)
  }

  render() {

    const allMeals = this.props.previousValues.meals 
    const guests = this.props.previousValues.numberOfGuests 
    const restaurant = this.props.previousValues.restaurant
    const mealTime = this.props.previousValues.mealTime

    return (

      <div>
        Meals: {Object.keys(allMeals).map(k => <p key={k}>{k}, {allMeals[k]}</p>)}
        <br />
        Guests: {guests}
        <br />
        restaurant: {restaurant}
        <br />
        mealtime: {mealTime}
        <br />
        <button onClick={ this.props.previousStep }>previous</button>
        <br />
        <button onClick={ this.display }>submit</button>
      </div>

    );
  }
}

export default StepFour;
