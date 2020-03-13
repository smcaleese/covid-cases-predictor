import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Chart extends PureComponent {
    render() {
      const dateArr = this.props.dateArr;
      const casesArr = this.props.casesArr;

      //console.log(dateArr);
      //console.log(casesArr);

      let data = [];
      let xAxisTicks = dateArr.length;

      for(let i = 0; i < xAxisTicks; i++) {
        let newElement = { name: dateArr[i], cases: casesArr[i] }
        data.push(newElement);
      }

      let graphWidth = (xAxisTicks / 30) * 1800;

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
            <Line connectNulls type="monotone" dataKey="cases" stroke="#e32619" fill="#e32619" animationDuration={100} />
          </LineChart>
      </div>
      );
    }
  }

  export default Chart;