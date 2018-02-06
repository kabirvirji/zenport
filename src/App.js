import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StepOne from './StepOne'
import StepTwo from './StepTwo'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      fieldValues : {
        mealTime: null,
        numberOfGuests: null
      }
    }
  };

  render() {
    // return a specific form based on current step
    // when user clicks next, calls forms validate function to check for valid input
    // if it is valid you increment next step
    // if not handle the errors

    const nextStep = () => {
      this.setState({
        step : this.state.step + 1
      })
    }

    // Same as nextStep, but decrementing
    const previousStep = () => {
      this.setState({
        step : this.state.step - 1
      })
    }

    console.log(this.state)

    switch (this.state.step) {
      case 1:
        return <StepOne />
      case 2:
        return <StepTwo />
    }

  }
}

export default App;
