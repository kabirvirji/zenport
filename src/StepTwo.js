import React, { Component } from 'react';
import './App.css';
import { FormErrors } from './FormErrors'

class StepTwo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mealTime: 'breakfast',
      numberOfGuests: 1,
      formErrors: {guests: ''},
      validNumber: false,
      formValid: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
    this.setState({formValid: this.state.numberOfGuestsValid});
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
          LALALALALAALALLALA
          <input
            name="numberOfGuests"
            type="number"
            min="0"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
        <FormErrors formErrors={this.state.formErrors} />
        <button onClick={ this.nextStep }>Save and Continue</button>
      </form>
    );
  }
}

export default StepTwo;
