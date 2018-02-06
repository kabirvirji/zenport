import React, { Component } from 'react';
import './App.css';

class StepOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mealTime: 'breakfast',
      numberOfGuests: 1
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name)
    console.log(value)
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log(this.state)
    // number can get negative
    // form required fields
    return (
      <form>
          <select
            name="mealTime"
            onChange={this.handleInputChange} >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">lunch</option>
            <option value="dinner">dinner</option>
          </select>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

export default StepOne;
