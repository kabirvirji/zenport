import React, { Component } from 'react';
import './App.css';
import { FormErrors } from './FormErrors'
import data from './data/dishes.json' 

class StepTwo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant : '',
      res: null,
      formValid: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveInput = this.saveInput.bind(this);
    console.log("CONSTRUCTOR PROPS", this.props)
    //this.filterData = this.filterData.bind(this);
  };

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
    // const data = {
    //   restaurant: this.restaurant
    // } 
    // this.props.saveValues(data)
    console.log("LOOK HERE STATE", this.state)
  }

  saveInput(event) {
    const data = {
      restaurant: this.restaurant
    } 
    this.props.saveValues(data)
  }



  render() {
    console.log("in render", this.state)
    // number can get negative
    // form required fields
    // no previous step for this form
    const meal = this.props.previousValues.mealTime
    let result = []
    let res = [1, 2, 3]
    let dishes = data.dishes
    for (let dish = 0; dish < data.dishes.length; dish++) {
      for (let i = 0; i < dishes[dish].availableMeals.length; i++) {
        if (dishes[dish].availableMeals[i] === meal) {
          result.push(dishes[dish].id)
          res.push(dishes[dish].restaurant)
        }
      }
    }
    // result contains the id's of the dishes to display in the drop down

    // need to loop through again and find the restaurant name based on id
    
    for (let j = 0; j < data.dishes.length; j++) {
      for (let k = 0; k < result.length; k++) {
        if (data.dishes[j].id === result[k]){
          res.push(data.dishes[j].restaurant)
        }
      }
    }
    // remove duplicates
    function uniq(a) {
        var seen = {};
        return a.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }
    res.unshift('--')
    res = uniq(res);
    // need to store res in local state, and use this.state.res for the dropdown
    // can do it at once dont need to go thru again
    // {res.map(element => <option value={element}>{element}</option>)}
    return (
      <form>

          <select
            name="restaurant"
            onChange={this.handleInputChange}>
              {res.map(element => <option value={element}>{element}</option>)}
          </select>
        <br />
        <button onClick={ this.previousStep }>previous</button>
        <button onClick={ this.nextStep, this.saveInput} disabled={!this.state.formValid}>Save and Continue</button>
      </form>
    );
  }
}

export default StepTwo;
