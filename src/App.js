import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StepOne from './StepOne'

class App extends Component {

  render() {
    // return a specific form based on current step
    // when user clicks next, calls forms validate function to check for valid input
    // if it is valid you increment next step
    // if not handle the errors
    return ( 
      <div className="App">
        <StepOne />
      </div>

    );
  }
}

export default App;
