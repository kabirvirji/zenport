import React, { Component } from 'react'
import '../styles/StepFour.css'

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

      <div className={"stepFour"}>
        <h2>Review</h2>
        <br />
        <p className={"item"}>Meal: {mealTime}</p>
        <br />
        <p className={"item"}>No. of People: {guests}</p>
        <br />
        <p className={"item"}>Restaurant: {restaurant}</p>
        <br />
        <p className={"item"}>Dishes:</p> 
        <div className={"mealsContainer"}>
          {Object.keys(allMeals).map(k => <p className={"meal"} key={k}>{k} x {allMeals[k]}</p>)}
        </div>
        <button className={"button"} onClick={ this.props.previousStep }>previous</button>
        <br />
        <button className={"button"} onClick={ this.display }>submit</button>
      </div>

    )
  }
}

export default StepFour
