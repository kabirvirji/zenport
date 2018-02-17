import React, { Component } from 'react'
import '../styles/StepOne.css'

class StepOne extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mealTime: 'breakfast',
      numberOfGuests: 1,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  handleInputChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value}
    )
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
      <div className={"stepOne"}>
        <form className={"form"}>
          <h1>Step 1</h1>
          <label className={"label"}>
            Please select a meal: 
          </label>
            <select
              name="mealTime"
              className={"input"}
              onChange={this.handleInputChange} >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          <br /><br />
          <label className={"label"}>
            Please enter number of people:
          </label>
            <input
              className={"input"}
              name="numberOfGuests"
              type="number"
              min="1"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          {!(this.state.numberOfGuests <= 10 && this.state.numberOfGuests !== '') ? <h2 className={"error"}>10 guests maximum</h2> : <h2 className={"valid"}>number of guests valid</h2>}
          <button className={"button"} onClick={this.nextStep} disabled={!(this.state.numberOfGuests <= 10 && this.state.numberOfGuests !== 0)}>Save and Continue</button>
        </form>
      </div>
    )
  }
}

export default StepOne
