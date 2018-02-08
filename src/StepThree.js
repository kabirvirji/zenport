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
    this.handleInputMeal = this.handleInputMeal.bind(this);
    this.handleInputServing = this.handleInputServing.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  handleInputMeal(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value,
      }
    );
  }

  handleInputServing(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value,
      }
    );
  }

  addItem(event) {
    event.preventDefault();
    this.setState((prevState) => ({
      totalDishes: +prevState.totalDishes + +this.state.currentServing,
      meals: {...prevState.meals, [prevState.currentMeal]: prevState.currentServing},
      validNumber: +prevState.totalDishes + +this.state.currentServing <= 10 && +prevState.totalDishes + +this.state.currentServing >= this.props.previousValues.numberOfGuests ? true : false
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
          onChange={this.handleInputMeal}
        >
          {availableMeals.map(element => <option value={element.name} key={element.name + element.name}>{element.name}</option>)}
        </select>
        <input
          name="currentServing"
          type="number"
          min="1"
          value={this.state.servings}
          onChange={this.handleInputServing} 
        />
        <h3>Please enter between {this.props.previousValues.numberOfGuests} and 10 meals (inclusive)</h3>
        <h3>Current total number of meal(s) : {this.state.totalDishes}</h3>
        
        <button onClick={ this.addItem }>add item</button>
        <button onClick={ this.props.previousStep }>previous</button>
        <button onClick={ this.saveInput } disabled={!this.state.validNumber}>Save and Continue</button>
      </form>
    );
  }
}

export default StepThree;
