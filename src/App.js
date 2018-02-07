import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      fieldValues : {
        mealTime: null,
        numberOfGuests: null,
        restaurant: null
      }
    }
  };

  render() {
    // return a specific form based on current step
    // when user clicks next, calls forms validate function to check for valid input
    // if it is valid you increment next step
    // if not handle the errors

    const nextStep = () => {
      this.setState((prevState) => ({
        step : prevState.step + 1
      }), () => console.log("after next step", this.state))
    }

    // Same as nextStep, but decrementing
    const previousStep = () => {
      this.setState((prevState) => ({
        step : prevState.step - 1
      }), () => console.log("after previous step", this.state))
    } 

    // can do a loop here instead of calling more than once elsewhere
    const saveValues = (obj) => {
      this.setState((prevState) => ({
        fieldValues: {...prevState.fieldValues, ...obj} 
      }), () => console.log("new state", this.state))
      
    }

    

    switch (this.state.step) {
      case 1:
        return <StepOne 
          saveValues={saveValues}
          nextStep={nextStep}
        />
      case 2:
        return <StepTwo
          saveValues={saveValues}
          nextStep={nextStep}
          previousStep={previousStep}
          previousValues={this.state.fieldValues}
        />
      case 3:
        return <StepThree
          saveValues={saveValues}
          nextStep={nextStep}
          previousStep={previousStep}
          previousValues={this.state.fieldValues}
        />
    }

  }
}

export default App;
