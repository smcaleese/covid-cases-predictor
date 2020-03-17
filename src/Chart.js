import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

class Chart extends PureComponent {
	getDates(forecastNumDays) {
		let dateToday = new Date();
		let daysArr = [];

		for(let i = 0; i < forecastNumDays; i++) {
			let dayOfMonth = dateToday.getDate();
			let monthNum = dateToday.getMonth();

			let newDate = dayOfMonth.toString() + "/" + (monthNum + 1).toString();
			daysArr.push(newDate);

			dateToday.setDate(dayOfMonth + 1); // automatically changes dayOfMonth to 1 and month to next month when end of month reached
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

      // red, orange, green, blue
      const colors = ["#e03e00", "#ea7100", "#00b200", "#0482cb"];

      let lineArr = [];
      // add lines to lineArr
      for(let i = 0; i < keyArr.length; i++) {
        const line = <Line connectNulls type="monotone" dataKey={ keyArr[i] } stroke={ colors[i % colors.length] } fill={ colors[i % colors.length ] } animationDuration={100} />;
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