import React, { Component } from 'react';
import './App.css';
import { FormErrors } from './FormErrors'
import data from './data/dishes.json' 

class StepTwo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant : '',
      formValid: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // does form validation on any change
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("name", name)
    console.log("value", value)
    this.setState({
        [name]: value,
        formValid: true
      }
    );
    // console.log(this.state.restaurant)
    // if (this.state.restaurant !== '') {
    //   this.setState({formValid: true});
    // }
  }

  render() {
    console.log(this.state)
    // number can get negative
    // form required fields
    // no previous step for this form
    return (
      <form>
          <select
            name="restaurant"
            onChange={this.handleInputChange} >
            <option value="Mcdondalds">Mcdondalds</option>
            <option value="coco curry">coco curry</option>
          </select>
        <br />
        <button onClick={ this.previousStep }>previous</button>
        <button onClick={ this.nextStep } disabled={!this.state.formValid}>Save and Continue</button>
      </form>
    );
  }
}

export default StepTwo;
