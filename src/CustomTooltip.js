import React from 'react';

// function creates tooltip and orders colors and values in the tooltip so that each color and value is nearest to its graph
export default function CustomTooltip({ payload, label, active }) {
  if (active) {
		// red -> orange -> blue -> green -> violet
		const colors = ["#e54304", "#f47100", "#93c400", "#179b6a", "#3f8487", "#1586f3", "#a885ff", "#e985ff", "#fd008a", "#000000", "#8c944b", "#53a367"];

		// create a mapping of colors to values (cases)
		let colorMap = {};
		for(let i = 0; i < payload.length; i++) {
				colorMap[colors[i]] = payload[i].value; 	// color : value
		}

		// sort map by values
		let sortedKeys = Object.keys(colorMap).sort(function(a, b) { return colorMap[b] - colorMap[a] })

		// get sorted values from sorted keys
		let sortedValues = [];
		for(const key of sortedKeys) {
			sortedValues.push(colorMap[key]);
		}

		// write values in descending order
		let listElements = [];
		for(let i = 0; i < sortedKeys.length; i++) {
			let newElement = <li key={ i }>
								<div style={{ color: sortedKeys[i] }}>cases</div>
								<div>{ colorMap[sortedKeys[i]].toLocaleString() }</div>
							</li>;
			listElements.push(newElement);
		}

    return (
      <div className="custom-tooltip">
				<p className="tooltip-label">{`${label}`}</p>
				<ul className="tooltip-ul">
					{ listElements }
				</ul>
      </div>
    );
  }

  return null;
}