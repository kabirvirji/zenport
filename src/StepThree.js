import React, { Component } from 'react';
import data from './data/dishes.json' 

class StepThree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dish: '',
      servings: ''
    };
  }


  render() {

    const test = this.props.previousValues
    console.log("test", test)
    // passes restaurant but lost other values
    const availableMeals = data.dishes.filter(o => o.restaurant === this.props.previousValues.restaurant)
    console.log(availableMeals)

    return (
      <form>
        <select>
          {availableMeals.map(element => <option value={element.name}>{element.name}</option>)}
        </select>

      </form>
    );
  }
}

export default StepThree;
