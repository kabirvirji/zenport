import React, { Component } from 'react';
import './App.css';
import { FormErrors } from './FormErrors'

class StepOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mealTime: 'breakfast',
      numberOfGuests: 0,
      formErrors: {guests: ''},
      validNumber: false,
      formValid: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  // valids field and sets state accordingly
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let numberOfGuestsValid = this.state.validNumber;

    if (fieldName === 'numberOfGuests') {
        numberOfGuestsValid = value <= 10;
        fieldValidationErrors.guests = numberOfGuestsValid ? '': 'maximum 10';
    }
    this.setState({formErrors: fieldValidationErrors,
                    validNumber: numberOfGuestsValid
                  }, this.validateForm);
  }

  // checks to see if whole form is valid
  validateForm() {
    this.setState({formValid: this.state.validNumber});
  }

  // does form validation on any change
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name)
    console.log(value)
    this.setState({
      [name]: value},
      () => { this.validateField(name, value) 
    });
  }

  nextStep(event) {
    const data = {
      mealTime: this.state.mealTime,
      numberOfGuests: this.state.numberOfGuests
    }
    console.log(data)
    this.props.saveValues(data)
    console.log("this props", this.props.nextStep())
  }

  render() {
    console.log(this.state)
    // number can get negative
    // form required fields
    // no previous step for this form
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
            min="0"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
        <FormErrors formErrors={this.state.formErrors} />
        <button onClick={ this.nextStep } disabled={!this.state.formValid}>Save and Continue</button>
      </form>
    );
  }
}

export default StepOne;
