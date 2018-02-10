import React, { Component } from 'react';
import data from '../data/dishes.json' 

class StepThree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      meals: {}, 
      currentMeal: null,
      currentServing: null,
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
      totalDishes: +prevState.totalDishes + +this.state.currentServing,
      meals: {...prevState.meals, [prevState.currentMeal]: (+prevState.meals[prevState.currentMeal] || 0) + +prevState.currentServing},
    }))
    console.log("add", this.state)
  }

  // deleting 10 of an item that was never in the cart still deletes from total dishes

  // when try to remove something that doesn't exist from cart it might add it to array and be empty
  // need to update current, 

  // if prevState.meals.currentMeal is not undefined then do subtraction or do nothing
  deleteItem(event) {
    event.preventDefault();
    this.setState((prevState) => ({
      totalDishes: prevState.meals[prevState.currentMeal] > 0 ? Math.max(+prevState.totalDishes - +this.state.currentServing, prevState.totalDishes) : prevState.totalDishes,
      meals: {...prevState.meals, (prevState.meals.currentMeal ? ([prevState.meals.currentMeal]: Math.max((+prevState.meals[prevState.currentMeal] || 0)) - +prevState.currentServing, 0))}
    }))
    console.log("delete", this.state)
  }

  saveInput(event) {
    const data = {
      meals: this.state.meals
    }
    this.props.saveValues(data)
    this.props.nextStep()
  }

  render() {
    const availableMeals = data.dishes.filter(o => o.restaurant === this.props.previousValues.restaurant)
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
        <button onClick={ this.addItem } disabled={!(this.state.currentMeal && this.state.currentServing)}>add item</button>
        <button onClick={ this.deleteItem } disabled={!(this.state.currentMeal && this.state.currentServing)}>delete item</button>
        <button onClick={ this.props.previousStep }>previous</button>
        <button onClick={ this.saveInput } disabled={!(this.state.totalDishes <= 10 && this.state.totalDishes >= this.props.previousValues.numberOfGuests)}>Save and Continue</button>
      </form>
    );
  }
}

export default StepThree;
