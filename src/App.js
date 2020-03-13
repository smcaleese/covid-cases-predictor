//import React from 'react';
import './App.css';
import Chart from './Chart';
import React from 'react';

function InputBox(props) {
    return (
      <div className="input-div">
        <p className="input-p">Current Cases</p>
        <input className="main-input" type="text" name="currentCases" onChange={ props.handleChange } value={ props.currentCases } />
        <p className="input-p">Average Daily Growth Rate (%)</p>
        <input className="main-input" type="text" name="avgDailyGrowthRate" onChange={ props.handleChange } value={ props.avgDailyGrowthRate } />
        <p className="input-p">Forecase Days</p>
        <input className="main-input" type="text" name="forecastNumDays" onChange={ props.handleChange } value={ props.forecastNumDays } />
      </div>
    );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCases: 100,
      avgDailyGrowthRate: 20,
      forecastNumDays: 15
    };
  }

  getDates = () => {
    let dateToday = new Date().toISOString().slice(0, 10);
    let dayOfMonth = parseInt(dateToday.slice(8, 10));

    let strDays = []; // dates from today
    let monthNum = parseInt(dateToday.slice(5, 7));
    let numDaysForecast = this.state.forecastNumDays;

    for(let i = 0; i < numDaysForecast; i++) {
      if(dayOfMonth % 30 == 1) { // assume 30 days in a month for now
        monthNum++;
        dayOfMonth = 1;
      }
      let newDate = dayOfMonth.toString() + "/" + monthNum.toString();
      strDays.push(newDate);
      dayOfMonth++;
    }
    return strDays;
  }

  getCases = (currCases, avgDailyGrowthRate) => {
    let casesArr = []; // cases per day

    for(let i = 0; i < this.state.forecastNumDays; i++) {
      let cases = this.state.currentCases * Math.pow((1 + (this.state.avgDailyGrowthRate / 100)), i) // cases for a given day
      cases = Math.round(cases);
      casesArr.push(cases);
    }
    console.log(casesArr);
    return casesArr;
  }

  handleInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    let today = new Date().toISOString().slice(0, 10)
    let todayCut = new Date().toISOString().slice(8, 10)

    let dateArr = this.getDates();
    let casesArr = this.getCases();

    return (
      <div>
      <InputBox handleChange={ this.handleInputChange }
        currentCases={ this.state.currentCases }
        avgDailyGrowthRate={ this.state.avgDailyGrowthRate }
        forecastNumDays={ this.state.forecastNumDays }
      />
      <Chart dateArr={ dateArr } casesArr={ casesArr } />
    </div>
    );
  }
}

export default App;
