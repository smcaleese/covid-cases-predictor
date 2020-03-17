import React from 'react';

function InputBox(props) {
    return (
      <div className="input-div">
        <p className="input-p">Current Cases</p>
        <input className="main-input" type="number" name={ props.currentCasesKey } onChange={ props.handleInputChange } value={ props.currentCasesValue } />
        <p className="input-p">Average Daily Growth Rate (%)</p>
        <input className="main-input" type="number" name={ props.avgDailyGrowthRateKey } onChange={ props.handleInputChange } value={ props.avgDailyGrowthRateValue } />
        <p className="input-p">Forecase Days</p>
        <input className="main-input" type="number" name={ props.forecastNumDaysKey } onChange={ props.handleInputChange } value={ props.forecastNumDaysValue } />
      </div>
    );
}

function InputContainer(props) {
  let inputBoxes = props.inputBoxes; // array of objects

  // convert array of objects in inputBoxes to array of InputBox components
  let inputBoxComponents = [];
  for(let i = 0; i < inputBoxes.length; i++) {
    let currentCasesKey = "currentCases" + i.toString();
    let avgDailyGrowthRateKey = "avgDailyGrowthRate" + i.toString();
    let forecastNumDaysKey = "forecastNumDays";

    console.log("i", i);

    // create an InputBox element from an object
    let inputBox = <InputBox
                    id={ i }
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
        { inputBoxListItems }
        <button onClick={ props.handleAddBoxButtonPress } className="input-box-button"> &#43; </button>
        <button onClick={ props.handleSubtractBoxButtonPress } className="input-box-button"> &minus; </button>
      </ul>
    </div>
  );
}

export default InputContainer;