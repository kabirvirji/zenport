import React, { Component } from 'react';
import '../styles/StepOne.css';

class StepOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mealTime: 'breakfast',
      numberOfGuests: 1,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  handleInputChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value}
    );
  }

  nextStep(event) {
    const data = {
      mealTime: this.state.mealTime,
      numberOfGuests: this.state.numberOfGuests
    }
    this.props.saveValues(data)
    this.props.nextStep()
  }

  render() {
    return (
      <form className={"form"}>
        <h1>Step 1</h1>
        <label className={"label"}>
          Meal Time:
        </label>
          <select
            name="mealTime"
            onChange={this.handleInputChange} >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        <br />
        <label className={"label"}>
          Number of guests:
        </label>
          <input
            className={"input"}
            name="numberOfGuests"
            type="number"
            min="1"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        {!(this.state.numberOfGuests <= 10 && this.state.numberOfGuests !== '') ? <h2>10 guests maximum</h2> : <h2>number of guests valid</h2>}
        <button onClick={this.nextStep} disabled={!(this.state.numberOfGuests <= 10 && this.state.numberOfGuests !== 0)}>Save and Continue</button>
      </form>
    );
  }
}

export default StepOne;
