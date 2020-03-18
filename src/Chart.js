import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import CustomTooltip from './CustomTooltip';

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

  getCases = (currentCases, avgDailyGrowthRate, forecastNumDays) => {
    let casesArr = []; // cases per day

    for(let i = 0; i < forecastNumDays; i++) {
      let cases = currentCases * Math.pow((1 + (avgDailyGrowthRate / 100)), i) // cases for a given day
      cases = Math.round(cases);
      casesArr.push(cases);
    }
    return casesArr;
  }

  // adds commas to numbers in y-axis
  formatYAxis(tickItem) {
	return tickItem.toLocaleString();
  }

  render() {
    let inputBoxes = this.props.inputBoxes; // array of objects

    	let forecastNumDays = inputBoxes[0]["forecastNumDays"];
		const dateArr = this.getDates(forecastNumDays);

		let newElement = {};
		newElement["dates"] = [];

		let arrOfArrays = [];
		arrOfArrays.push(dateArr);

		// loop through inputBoxes, get cases arrays and create newElement template
		let cases = "cases";
		for(let i = 0; i < inputBoxes.length; i++) {
			let currentCasesKey = "currentCases" + i.toString();
    	let avgDailyGrowthRateKey = "avgDailyGrowthRate" + i.toString();

			let nextCasesArr = this.getCases(inputBoxes[i][currentCasesKey], inputBoxes[i][avgDailyGrowthRateKey], forecastNumDays);
			arrOfArrays.push(nextCasesArr);
			newElement[cases + (i + 1).toString() ] = []; 	// add cases key
		}

		// template: newElement = {dates: [], cases1: [], cases2: [], ...};
		// arrOfArrays = [ [dateArr], [cases1], [cases2], [cases3] ];

		let data = [];
		const keys = Object.keys(newElement);

		// i loops 'down' and adds new newElements to data for every date while keyArrIndex loops 'across' and fills a newElement using arrOfArrays
		for(let i = 0; i < dateArr.length; i++) {
			let newElementCopy = {...newElement}; // create shallow copy
			let keyArrIndex = 0;
			for(const key of keys) {
				newElementCopy[key] = arrOfArrays[keyArrIndex][i];
				keyArrIndex++;
			}
			data.push(newElementCopy);
		}

    	// example data:
    	// [{ dates: 2/3, cases1: 100, cases2: 50 },
    	// { dates: 3/3, cases1: 200, cases2: 100 }]

	    // red -> orange -> blue -> green -> violet
		const colors = ["#e54304", "#f47100", "#93c400", "#179b6a", "#3f8487", "#1586f3", "#a885ff", "#e985ff", "#fd008a", "#808080", "#8c944b", "#53a367"];

		// create a line for every cases key (index 1 to n)
		let lineArr = [];
    	for(let i = 1; i < keys.length; i++) {
      		const line = <Line connectNulls key={ i } type="monotone" strokeWidth="2"
				dataKey={ keys[i] } stroke={ colors[i - 1] } fill={ colors[(i - 1)] } animationDuration={ 100 } />;
      		lineArr.push(line);
		}

		let xAxisTicks = dateArr.length;
		let graphWidth = (xAxisTicks / 30) * 1800;

    	return (
      		<div>
        	<LineChart
          		width={ graphWidth }
          		height={ 500 }
          		data={ data }
         	 	margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
       	 	>
          	<CartesianGrid strokeDasharray="5 5" />
          	<XAxis dataKey="dates" tick={{ fontFamily: 'Helvetica' }} tickCount={ 100 } />
          	<YAxis tick={{ fontFamily: 'Helvetica' }} tickFormatter={ this.formatYAxis } />
          	<Tooltip content={ <CustomTooltip /> } animationDuration={ 50 } wrapperStyle={{ font: '1rem Helvetica, Arial' }} />
          	{ lineArr }
        	</LineChart>
    		</div>
    	);
  	}
}

export default Chart;