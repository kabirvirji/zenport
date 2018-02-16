import React, { Component } from 'react';
import './Main.css';
import StepOne from './steps/StepOne'
import StepTwo from './steps/StepTwo'
import StepThree from './steps/StepThree'
import StepFour from './steps/StepFour'

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      fieldValues : {
        mealTime: null,
        numberOfGuests: null,
        restaurant: null,
        meals: null
      }
    }
  };

  render() {

    const nextStep = () => {
      this.setState((prevState) => ({
        step : prevState.step + 1
      }))
    }

    const previousStep = () => {
      this.setState((prevState) => ({
        step : prevState.step - 1
      }))
    } 

    const saveValues = (obj) => {
      this.setState((prevState) => ({
        fieldValues: {...prevState.fieldValues, ...obj} 
      }))
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
      case 4:
        return <StepFour
          saveValues={saveValues}
          nextStep={nextStep}
          previousStep={previousStep}
          previousValues={this.state.fieldValues} 
        />
      default:
        return <StepOne 
          saveValues={saveValues}
          nextStep={nextStep}
        />
    }

  }
}

export default Main;
