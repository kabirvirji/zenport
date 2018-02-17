import React, { Component } from 'react'
import data from '../data/dishes.json'
import '../styles/StepThree.css'

class StepThree extends Component {

  constructor(props) {
    super(props)
    this.state = {
      meals: {}, 
      currentMeal: null,
      currentServing: 0,
      totalDishes: 0,
    }
    this.handleInput = this.handleInput.bind(this)
    this.saveInput = this.saveInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  handleInput(event) {
    const {name, value} = event.target
    this.setState({
        [name]: value,
      }
    )
  }

  addItem(event) {
    event.preventDefault()
    this.setState((prevState) => ({
      totalDishes: +prevState.totalDishes + +prevState.currentServing,
      meals: {...prevState.meals, [prevState.currentMeal]: (+prevState.meals[prevState.currentMeal] || 0) + +prevState.currentServing},
    }))
  }

  deleteItem(event) {
    event.preventDefault()
    if (this.state.meals.hasOwnProperty(this.state.currentMeal)) {
      const maxDelete = this.state.meals[this.state.currentMeal] // quantity of current item that is already added
      const value = Math.max(+this.state.meals[this.state.currentMeal] - +this.state.currentServing, 0)
      this.setState((prevState) => ({
        totalDishes: Math.max(prevState.totalDishes - prevState.currentServing, prevState.totalDishes - maxDelete),
        meals: {...prevState.meals, [prevState.currentMeal]: value}
      }))
    }
  }

  saveInput(event) {
    const data = {
      meals: this.state.meals
    }
    this.props.saveValues(data)
    this.props.nextStep()
  }

  render() {
    // filter data based on meal time and restaurant
    let availableMeals = data.dishes.filter(o => (o.restaurant === this.props.previousValues.restaurant && o.availableMeals.indexOf(this.props.previousValues.mealTime) !== -1))
    availableMeals.unshift('--')
    return (
      <div className={"stepThree"}>
        <form className={"form"}>
          <h1>Step 3</h1>
          <label className={"label"}>
            Please Select a Dish:
          </label>
          <select
            className={"input"}
            name="currentMeal"
            onChange={this.handleInput}
          >
            {availableMeals.map(element => <option value={element.name} key={`${element.name}_${element}`}>{element.name}</option>)}
          </select>
          <label className={"label"}>
            Please enter no. of servings:
          </label>
          <input
            className={"input"}
            name="currentServing"
            type="number"
            min="1"
            value={this.state.servings}
            onChange={this.handleInput} 
          />
          <h3>Current total number of meals : {this.state.totalDishes}</h3>
          {!(this.state.totalDishes <= 10 && this.state.totalDishes >= this.props.previousValues.numberOfGuests) ? <h2 className={"error"}>Please enter between {this.props.previousValues.numberOfGuests} and 10 meals (inclusive)</h2> : <h2 className={"valid"}>Enough meals</h2>}
          <h3>Current Meals:</h3>
          <div className={"mealsContainer"}>
            {Object.keys(this.state.meals).map(m => <p className={"meal"} key={m}>{m} x {this.state.meals[m]}</p>)}
          </div>
          <br /><br />
          <button className={"button"} onClick={this.props.previousStep}>Previous</button>
          <button className={"button"} onClick={this.addItem} disabled={!(this.state.currentMeal && this.state.currentServing)}>add item</button>
          <button className={"button"} onClick={this.deleteItem} disabled={!(this.state.currentMeal && this.state.currentServing)}>delete item</button>
          <button className={"button"} onClick={this.saveInput} disabled={!(this.state.totalDishes <= 10 && this.state.totalDishes >= this.props.previousValues.numberOfGuests)}>Save and Continue</button>
        </form>
      </div>
    )
  }
}

export default StepThree
