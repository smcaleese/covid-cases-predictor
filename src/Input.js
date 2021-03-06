import React from 'react';

function InputBox(props) {
    return (
      <div className="input-div" style={{ backgroundColor: props.backgroundColor }}>
        <div className="input-section">
          <p className="input-p">Current Cases</p>
          <input className="input-box" type="number" name={ props.currentCasesKey } onChange={ props.handleInputChange } value={ props.currentCasesValue } />
        </div>
        <div className="input-section">
          <p className="input-p">Average Daily Growth Rate (%)</p>
          <input className="input-box" type="number" name={ props.avgDailyGrowthRateKey } onChange={ props.handleInputChange } value={ props.avgDailyGrowthRateValue } />
        </div>
        <div className="input-section">
          <p className="input-p">Forecase Days</p>
          <input className="input-box" type="number" name={ props.forecastNumDaysKey } onChange={ props.handleInputChange } value={ props.forecastNumDaysValue } />
        </div>
      </div>
    );
}

function InputContainer(props) {
  let inputBoxes = props.inputBoxes; // array of objects
  const colors = ["#e54304", "#f47100", "#93c400", "#179b6a", "#3f8487", "#1586f3", "#a885ff", "#e985ff", "#fd008a", "#808080", "#8c944b", "#53a367"];

  // convert array of objects in inputBoxes to array of InputBox components
  let inputBoxComponents = [];
  for(let i = 0; i < inputBoxes.length; i++) {
    let currentCasesKey = "currentCases" + i.toString();
    let avgDailyGrowthRateKey = "avgDailyGrowthRate" + i.toString();
    let forecastNumDaysKey = "forecastNumDays";

    // create an InputBox element from an object
    let inputBox = <InputBox
                    id={ i }
                    backgroundColor={ colors[i] }
                    handleInputChange={ props.handleInputChange }

                    currentCasesKey={ currentCasesKey }
                    avgDailyGrowthRateKey={ avgDailyGrowthRateKey }
                    forecastNumDaysKey={ forecastNumDaysKey }

                    currentCasesValue={ inputBoxes[i][currentCasesKey] }
                    avgDailyGrowthRateValue={ inputBoxes[i][avgDailyGrowthRateKey] }
                    forecastNumDaysValue={ inputBoxes[0][forecastNumDaysKey] }
                   />;
    inputBoxComponents.push(inputBox);
  }

  // change list of divs to list of <li>'s
  const inputBoxListItems = inputBoxComponents.map((inputBox) =>
    <li key={ inputBox.props.id }> { inputBox } </li>
  );

  return (
    <div>
      <ul className="input-ul">
        <li>{ inputBoxListItems }</li>
        <li className="input-box-button-li">
          <span className="input-box-buttons">
            <button onClick={ props.handleAddBoxButtonPress } className="input-box-button"> &#43; </button>
            <button onClick={ props.handleSubtractBoxButtonPress } className="input-box-button"> &minus; </button>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default InputContainer;