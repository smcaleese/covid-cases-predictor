//import React from 'react';
import './App.css';

import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Example extends PureComponent {
  render() {
    const dateArr = this.props.dateArr;
    const casesArr = this.props.casesArr;

    const data = [];

    for(var i = 0; i < 10; i++) {
      let newElement = { name: dateArr[i], uv: casesArr[i] }
      data.push(newElement);
    }

    return (
      <div>
        <LineChart
          width={1500}
          height={500}
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line connectNulls type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" animationDuration={100} />
        </LineChart>
    </div>
    );
  }
}

/* For debugging Purposes */
/*
function DateList(props) {
  const dayArr = props.arr;
  const listItems = dayArr.map((date) =>
    <li>{ date }</li>
  );
  return (
    <ul>{ listItems }</ul>
  );
}

function CasesList(props) {
  const casesArr = props.arr;
  const listItems = casesArr.map((c) =>
    <li>{ c }</li>
  );
  return (
    <ul>{ listItems }</ul>
  );
}
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCases: 100,
      avgDailyGrowthRate: 20,
      forecastNumDays: 30
    };
  }

  static getDates() {
    let today = new Date().toISOString().slice(0, 10)

    // get dates of next four days based on today
    // today = "2020-03-12"

    var strDays = [];
    var currDay = parseInt(today.slice(8, 10)); // 12

    for(var i = 0; i < 10; i++) {
      let newDate = "2020-03-" + currDay.toString();
      currDay++;
      strDays.push(newDate);
    }
    return strDays;
  }

  static getCases(currCases, avgDailyGrowthRate, forecastNumDays) {
    //var currCases = this.state.currentCases; // eg. 50
    var futureCases = []; // cases per day for the next 30 days

    for(var i = 0; i < forecastNumDays; i++) {
      // cases for a given day
      var cases = currCases * Math.pow((1 + (avgDailyGrowthRate / 100)), i)
      futureCases.push(cases);
    }
    return futureCases;
  }

  handleInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    // wait for full input
    setTimeout(() =>
      this.setState({
        [name]: value
      }),
      100
    );


  }

  render() {
    let today = new Date().toISOString().slice(0, 10)
    let todayCut = new Date().toISOString().slice(8, 10)
    var dateArr = App.getDates();

    var currCases = this.state.currentCases;
    var avgDailyGrowthRate = this.state.avgDailyGrowthRate;
    var forecastNumDays = this.state.forecastNumDays;
    var casesArr = App.getCases(currCases, avgDailyGrowthRate, forecastNumDays);

    return (
      <div>
      <p>Current Cases</p>
      <input type="text" name="currentCases" onChange={ this.handleInputChange } />
      <p>Average Daily Growth Rate (%)</p>
      <input type="text" name="avgDailyGrowthRate" onChange={ this.handleInputChange } />
      <p>Forecase Days</p>
      <input type="text" name="forecastNumDays" onChange={ this.handleInputChange } />
      <br /><br />
      <Example dateArr={ dateArr } casesArr={ casesArr } />
    </div>
    );
  }
}

export default App;
