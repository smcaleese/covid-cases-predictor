import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Chart extends PureComponent {
  getDates = (numDays) => {
    let dateToday = new Date().toISOString().slice(0, 10);
    let dayOfMonth = parseInt(dateToday.slice(8, 10));

    let daysArr = []; // dates from today
    let monthNum = parseInt(dateToday.slice(5, 7));
    for(let i = 0; i < numDays; i++) {
      if(dayOfMonth % 30 === 1) { // assume 30 days in a month for now
        monthNum++;
        dayOfMonth = 1;
      }
      let newDate = dayOfMonth.toString() + "/" + monthNum.toString();
      daysArr.push(newDate);
      dayOfMonth++;
    }
    return daysArr;
  }

  getCases = (currCases, avgDailyGrowthRate, numDays) => {
    let casesArr = []; // cases per day

    for(let i = 0; i < numDays; i++) {
      let cases = currCases * Math.pow((1 + (avgDailyGrowthRate / 100)), i) // cases for a given day
      cases = Math.round(cases);
      casesArr.push(cases);
    }
    console.log(casesArr);
    return casesArr;
  }

    render() {
      let inputBoxes = this.props.inputBoxes; // array of objects

      let numDays = inputBoxes[0]["forecastNumDays"];
      const dateArr = this.getDates(numDays);
      console.log("numDays:", numDays);

      var newElement = { name: [] };

      // create template by adding columns: newElement
      for(let i = 1; i <= inputBoxes.length; i++) {
        newElement["cases" + i.toString()] = [];
      }

      // now newElement looks something like: newElement = { name: [], cases1: [], cases2: [] }

      // call getCases() for every element in inputBoxes and return an array of case data based on those inputs
      let casesArrOfArrays = [];
      casesArrOfArrays.push(dateArr);
      console.log("dateArr", dateArr);

      let numCaseColumns = inputBoxes.length;
      for(let i = 0; i < numCaseColumns; i++) {
        // create new unique cases array based on each input box
        let currCasesKey = Object.keys(inputBoxes[i])[0];
        let avgDailyGrowthRateKey = Object.keys(inputBoxes[i])[1];
        console.log("value2:", numDays);
        let casesArr = this.getCases(inputBoxes[i][currCasesKey], inputBoxes[i][avgDailyGrowthRateKey], numDays);
        casesArrOfArrays.push(casesArr);
      }

      console.log("x:", casesArrOfArrays);

      // array of arrays
      // [dateArr, cases1, cases2, ...]

      // populate empty columns with data
      let data = [];

      // let newElement = { name: casesArrOfArrays[0][i], cases1: casesArrOfArrays[1][i], cases2: casesArrOfArrays[2][i], ...}

      const keys = Object.keys(newElement);
      // create and push a new element for each date
      // i loops 'down' while keyArrIndex loops 'accross'
      for(let i = 0; i < casesArrOfArrays[0].length; i++) {
        let newElementCopy = {...newElement}; // create shallow copy of object otherwise all elements in data will be the same
        let keyArrIndex = 0;
        for(const key of keys) {
          newElementCopy[key] = casesArrOfArrays[keyArrIndex][i];
          keyArrIndex++;
        }
        data.push(newElementCopy);
      }



      // example data:
      // { name: 2/3, cases1: 100, cases2: 50 }
      // { name: 3/3, cases1: 200, cases2: 100 }

      let xAxisTicks = dateArr.length;
      let graphWidth = (xAxisTicks / 30) * 1800;

      // get keys for dataKey
      let keyArr = [];
      for(const key of keys) {
        keyArr.push(key);
      }
      keyArr = keyArr.splice(1) // remove dates key
      console.log("data:", keyArr);

      let lineArr = [];
      // add lines to lineArr
      for(let i = 0; i < keyArr.length; i++) {
        const line = <Line connectNulls type="monotone" dataKey={ keyArr[i] } stroke="#e32619" fill="#e32619" animationDuration={100} />;
        lineArr.push(line);
      }
      console.log("lines:", lineArr);

      return (
        <div>
          <LineChart
            width={graphWidth}
            height={500}
            data={data}
            margin={{
              top: 20, right: 10, left: 10, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" tickCount={100} />
            <YAxis />
            <Tooltip animationDuration={50} wrapperStyle={{ font: '16px Arial' }} />
            { lineArr }
          </LineChart>
      </div>
      );
    }
  }

  export default Chart;