import React, { Component } from 'react';
import data from '../data/dishes.json' 

class StepThree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      meals: {}, 
      currentMeal: null,
      currentServing: 0,
      totalDishes: 0,
    };
    this.handleInput = this.handleInput.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleInput(event) {
    const {name, value} = event.target
    this.setState({
        [name]: value,
      }
    );
  }

  addItem(event) {
    event.preventDefault();
    this.setState((prevState) => ({
      totalDishes: +prevState.totalDishes + +prevState.currentServing,
      meals: {...prevState.meals, [prevState.currentMeal]: (+prevState.meals[prevState.currentMeal] || 0) + +prevState.currentServing},
    }))
  }

  deleteItem(event) {
    event.preventDefault();
    if (this.state.meals.hasOwnProperty(this.state.currentMeal)) {
      let value = Math.max(+this.state.meals[this.state.currentMeal] - +this.state.currentServing, 0)
      this.setState((prevState) => ({
        totalDishes: Math.max(+prevState.totalDishes - +prevState.currentServing, 0),
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

  // need to make the meals view a scroll view since when you add lots it keeps moving everything down

  // warning for pizzeria since two items with the same name

  render() {
    let availableMeals = data.dishes.filter(o => o.restaurant === this.props.previousValues.restaurant)
    availableMeals.unshift('--')
    return (
      <form>
        <select
          name="currentMeal"
          onChange={this.handleInput}
        >
          {availableMeals.map(element => <option value={element.name} key={`${element.name}_${element}`}>{element.name}</option>)}
        </select>
        <input
          name="currentServing"
          type="number"
          min="1"
          value={this.state.servings}
          onChange={this.handleInput} 
        />
        <h3>Current total number of meal(s) : {this.state.totalDishes}</h3>
        {!(this.state.totalDishes <= 10 && this.state.totalDishes >= this.props.previousValues.numberOfGuests) ? <h2>Please enter between {this.props.previousValues.numberOfGuests} and 10 meals (inclusive)</h2> : <h2>Enough meals</h2>}
        Current Meals: {Object.keys(this.state.meals).map(m => <p key={m}>{m} x {this.state.meals[m]}</p>)}
        <button onClick={this.addItem} disabled={!(this.state.currentMeal && this.state.currentServing)}>add item</button>
        <button onClick={this.deleteItem} disabled={!(this.state.currentMeal && this.state.currentServing)}>delete item</button>
        <button onClick={this.props.previousStep}>previous</button>
        <button onClick={this.saveInput} disabled={!(this.state.totalDishes <= 10 && this.state.totalDishes >= this.props.previousValues.numberOfGuests)}>Save and Continue</button>
      </form>
    );
  }
}

export default StepThree;
