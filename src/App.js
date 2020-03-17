//import React from 'react';
import './App.css';
import Chart from './Chart';
import InputContainer from './Input';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputBoxes: [
        {
          currentCases0: 100,
          avgDailyGrowthRate0: 20,
          forecastNumDays: 15,
        },
        {
          currentCases1: 200,
          avgDailyGrowthRate1: 20,
          forecastNumDays: 15,
        }
      ]
    };
  }

  handleInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    // if input is empty
    if(isNaN(value)) {
      value = 0;
    }

    let newinputBoxes = this.state.inputBoxes.slice();
    let key = name.slice(-1); // eg. currentCases0 -> 0

    // if input is from forecastNumDays, change value of first element and they
    // will all change because forecastNumDays is the same for all elements
    if(isNaN(key)) {
      key = 0;
    }

    value = parseInt(value);
    newinputBoxes[key][name] = value;
    this.setState({ inputBoxes: newinputBoxes });
    console.log("state", this.state);
    console.log("value", value, typeof value);
  }

  handleAddBoxButtonPress = (event) => {
    let inputBoxArrLen = this.state.inputBoxes.length.toString();

    let firstKey = "currentCases" + inputBoxArrLen;
    let secondKey = "avgDailyGrowthRate" + inputBoxArrLen;
    let thirdKey = "forecastNumDays";

    let newBox = {
      [firstKey]: 100 + (parseInt(inputBoxArrLen) * 100), // slightly increase value for each new input box to make graph look nicer
      [secondKey]: 20,
      [thirdKey]: 15
    };

    this.setState(state => ({
      inputBoxes: state.inputBoxes.concat(newBox)
    }));
    console.log("state", this.state);
  }

  handleSubtractBoxButton = (event) => {
    if(this.state.inputBoxes.length > 1) {
      this.setState(state => ({
        inputBoxes: state.inputBoxes.slice(0, this.state.inputBoxes.length - 1)   // remove last box
      }));
    }
  }
  
  render() {
    return (
      <div>
      <InputContainer
        handleInputChange={ this.handleInputChange }
        inputBoxes={ this.state.inputBoxes }
        handleAddBoxButtonPress={ this.handleAddBoxButtonPress }
        handleSubtractBoxButtonPress={ this.handleSubtractBoxButtonPress }
      />
      <Chart inputBoxes={ this.state.inputBoxes } />
    </div>
    );
  }
}

export default App;
