import React, { Component } from 'react';
import data from '../data/dishes.json'
import '../styles/StepTwo.css';

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
      <div className={"stepTwo"}>
        <form className={"form"}>
            <h1>Step 2</h1>
          <label className={"label"}>
            Please select a restaurant:
          </label>
            <select
              name="restaurant"
              className={"input"}
              onChange={this.handleInputChange}>
                {res.map(element => <option value={element} key={element}>{element}</option>)}
            </select>
          <br /><br />
          <button className={"button"} onClick={this.props.previousStep}>Previous</button>
          <button className={"button"} onClick={this.saveInput} disabled={!(this.state.restaurant !== 'default')}>Save and Continue</button>
        </form>
      </div>
    );
  }
}

export default StepTwo;
