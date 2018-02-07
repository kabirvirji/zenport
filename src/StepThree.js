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
    // this.saveInput = this.saveInput.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  handleInputMeal(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("name", name)
    console.log("value", value)
    this.setState({
        [name]: value,
      }
    );
  }

  handleInputServing(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("name", name)
    console.log("value", value)
    this.setState({
        [name]: value,
      }
    );
  }

  addItem(event) {
    console.log(this.state.currentMeal)
    console.log(this.state.currentServing)
    event.preventDefault();
    this.setState((prevState) => ({
      totalDishes: +prevState.totalDishes + +this.state.currentServing,
      meals: {...prevState.meals, [prevState.currentMeal]: prevState.currentServing},
      validNumber: +prevState.totalDishes + +this.state.currentServing <= 10 && +prevState.totalDishes + +this.state.currentServing >= this.props.previousValues.numberOfGuests ? true : false
    }))
    
    // if dishes enough
    // if (this.state.totalDishes <= 10 && this.state.totalDishes >= this.props.previousValues.numberOfGuests) {
    //   this.setState({
    //     validNumber: true
    //   })
    // }
  }

  // when add, see if it is valid number

  render() {
    console.log("in render", this.state)
    const test = this.props.previousValues
    console.log("test", test)
    // passes restaurant but lost other values
    const availableMeals = data.dishes.filter(o => o.restaurant === this.props.previousValues.restaurant)
    console.log(availableMeals)
    availableMeals.unshift('--')

    // initilize this.state.meals because we already know which meals are allowed 
    // for (let i = 0; i < availableMeals.length; i++) {
    //   this.state.meals[availableMeals[i].name] = null
    // }
    // console.log(this.state.meals)

    // {[this.state.meals].map(i => {i, this.state.meals[i]})}
    // <h2>Ordered: {availableMeals.map(i => <p>{i, this.state.meals.i}</p>)}</h2>
    // const mealsArr = [this.state.meals].entries()
    // console.log(mealsArr)
    return (
      <form>
        <select
          name="currentMeal"
          onChange={this.handleInputMeal}
        >
          {availableMeals.map(element => <option value={element.name}>{element.name}</option>)}
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
