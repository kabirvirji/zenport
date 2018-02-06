import React, { Component } from 'react';
import './App.css';
import { FormErrors } from './FormErrors'

class StepOne extends Component {


  render() {

    const test = this.props.previousValues
    console.log("test", test)
    // passes restaurant but lost other values

    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

export default StepOne;
