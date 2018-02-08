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
      validNumber: false,
      errorMsg: 'Please enter more meals',
      mealServing: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addItemReveal = this.addItemReveal.bind(this);
  }

  handleInput(event) {
    const {name, value} = event.target
    this.setState({
        [name]: value,
      }
    );
  }

  // add 2, and then add 4. total is 6, good. but meals {} is still at 4
  // need to change how meals is dealt with here
  // also simpler than this expression? 
  // errorMsg has the big expressions too since it relies on valid number

  addItem(event) {
    event.preventDefault();
    this.setState((prevState) => ({
      totalDishes: +prevState.totalDishes + +this.state.currentServing,
      meals: {...prevState.meals, [prevState.currentMeal]: prevState.currentServing},
      validNumber: (+prevState.totalDishes + +this.state.currentServing <= 10 && +prevState.totalDishes + +this.state.currentServing >= this.props.previousValues.numberOfGuests),
      errorMsg: +prevState.totalDishes + +this.state.currentServing <= 10 && +prevState.totalDishes + +this.state.currentServing >= this.props.previousValues.numberOfGuests ? '' : 'Please enter more meals',
    }))
  }

  addItemReveal(event) {
    event.preventDefault();
    console.log(this.state)
    this.setState((prevState) => ({
      mealServing: (prevState.currentMeal !== null && prevState.currentServing !== null)
    }))
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
    // <h2>Ordered: {availableMeals.map(i => <p>{i}, {this.state.meals.i}</p>)}</h2>
    return (
      <form>
        <select
          name="currentMeal"
          onChange={event => { this.handleInput(event); this.addItemReveal(event)}}
        >
          {availableMeals.map(element => <option value={element.name} key={`${element.name}_${element}`}>{element.name}</option>)}
        </select>
        <input
          name="currentServing"
          type="number"
          min="1"
          value={this.state.servings}
          onChange={event => {this.handleInput(event); this.addItemReveal(event)}} 
        />
        <h3>Please enter between {this.props.previousValues.numberOfGuests} and 10 meals (inclusive)</h3>
        <h3>Current total number of meal(s) : {this.state.totalDishes}</h3>
        
        <h2>{this.state.errorMsg}</h2>
        <button onClick={ this.addItem } disabled={!this.state.mealServing}>add item</button>
        <button onClick={ this.props.previousStep }>previous</button>
        <button onClick={ this.saveInput } disabled={!this.state.validNumber}>Save and Continue</button>
      </form>
    );
  }
}

export default StepThree;
