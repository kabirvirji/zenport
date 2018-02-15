import React, { Component } from 'react';
import data from '../data/dishes.json' 

class StepTwo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant : 'default',
      res: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveInput = this.saveInput.bind(this);
  };

  handleInputChange(event) {
    const {name, value} = event.target
    this.setState({
        [name]: value,
      }
    );
  }

  saveInput(event) {
    const data = {
      restaurant: this.state.restaurant
    }
    this.props.saveValues(data)
    this.props.nextStep()
  }

  render() {

    const meal = this.props.previousValues.mealTime
    let result = data.dishes.filter(dish => dish.availableMeals.some(m => m === meal)).map(dish => dish.id)
    let res = data.dishes.filter(dish => result.some(result => dish.id === result)).map(d => d.restaurant)
    res = Array.from(new Set(res)) // remove duplicates
    res.unshift('--') // add visual default for dropdown

    return (
      <form>
          <select
            name="restaurant"
            onChange={this.handleInputChange}>
              {res.map(element => <option value={element} key={element}>{element}</option>)}
          </select>
        <br />
        <button onClick={ this.props.previousStep }>previous</button>
        <button onClick={ this.saveInput } disabled={!(this.state.restaurant !== 'default')}>Save and Continue</button>
      </form>
    );
  }
}

export default StepTwo;
