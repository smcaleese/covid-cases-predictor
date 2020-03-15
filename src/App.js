//import React from 'react';
import './App.css';
import Chart from './Chart';
import InputContainer from './Input';
import React from 'react';

// TODO:
// change color for each graph?
// merge branch and push changes to github
// make app more mobile-friendly
// add social distancing as an input
// refactor / simplify code

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
    console.log(name, value);
    let v = 0;
    if(value !== "") {
      v = parseInt(value);
    }
    else {
      v = 0;
    }
    console.log("v", v, typeof v);
    //console.log("change detected!");

    let stateCopy = Object.assign({}, this.state);
    stateCopy.inputBoxes = stateCopy.inputBoxes.slice();
    let key = name.slice(-1); // number at end of object key, key for inputBoxes array
    //console.log("key", key);

    if(isNaN(key)) {
      // for forecast days change
      key = 0;
    }

    stateCopy.inputBoxes[key] = Object.assign({}, stateCopy.inputBoxes[key]);
    stateCopy.inputBoxes[key][name] = v;
    console.log("test", stateCopy.inputBoxes[key][name]);
    this.setState(stateCopy);
    console.log("state", this.state);
  }

  handleAddBoxButton = (event) => {
    let currArrLen = this.state.inputBoxes.length.toString();
    let firstKey = "currentCases" + currArrLen;
    let secondKey = "avgDailyGrowthRate" + currArrLen;
    let thirdKey = "forecastNumDays";

    let defaultBox = {
      [firstKey]: 100 + (currArrLen * 10),
      [secondKey]: 20,
      [thirdKey]: 15
    };

    this.setState(state => ({
      inputBoxes: state.inputBoxes.concat(defaultBox)
    }));
    console.log("state", this.state);
  }

  handleSubtractBoxButton = (event) => {
    if(this.state.inputBoxes.length > 1) {
      this.setState(state => ({
        inputBoxes: state.inputBoxes.slice(0, this.state.inputBoxes.length - 1)
      }));
    }
  }

  render() {
    return (
      <div>
      <InputContainer
        handleChange={ this.handleInputChange }
        inputBoxes={ this.state.inputBoxes }
        handlePositiveButtonPress={ this.handleAddBoxButton }
        handleNegativeButtonPress={ this.handleSubtractBoxButton }
      />
      <Chart inputBoxes={ this.state.inputBoxes } />
    </div>
    );
  }
}

export default App;
