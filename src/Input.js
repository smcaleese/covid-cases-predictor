import React from 'react';

function InputBox(props) {
    return (
      <div className="input-div">
        <p className="input-p">Current Cases</p>
        <input className="main-input" type="text" name={ props.currentCasesName } onChange={ props.handleChange } value={ props.currentCasesValue } />
        <p className="input-p">Average Daily Growth Rate (%)</p>
        <input className="main-input" type="text" name={ props.avgDailyGrowthRateName } onChange={ props.handleChange } value={ props.avgDailyGrowthRateValue } />
        <p className="input-p">Forecase Days</p>
        <input className="main-input" type="text" name={ props.forecastNumDaysName } onChange={ props.handleChange } value={ props.forecastNumDaysValue } />
      </div>
    );
}

function InputContainer(props) {
  let inputBoxes = props.inputBoxes; // array of objects

  // convert array of objects to array of InputBoxes
  let inputBoxElements = [];
  for(let i = 0; i < inputBoxes.length; i++) {
    let firstKey = Object.keys(inputBoxes[i])[0];
    let secondKey = Object.keys(inputBoxes[i])[1];
    let thirdKey = Object.keys(inputBoxes[i])[2];
    console.log("keys:");
    console.log(":", firstKey);
    console.log(":", secondKey);
    console.log(":", thirdKey);
    console.log("currentCasesName", inputBoxes[i][firstKey]);
    console.log("avgDailyGrowthRate:", inputBoxes[i][secondKey]);
    console.log("forecastNumDaysName:", inputBoxes[i][thirdKey]);
    console.log("sep");
    // create an InputBox element from an object
    let inputBox = <InputBox
                    currentCasesName={ firstKey }
                    avgDailyGrowthRateName={ secondKey }
                    forecastNumDaysName={ thirdKey }

                    currentCasesValue={ inputBoxes[i][firstKey] }
                    avgDailyGrowthRateValue={ inputBoxes[i][secondKey] }
                    forecastNumDaysValue={ inputBoxes[0]["forecastNumDays"] }
                    handleChange={ props.handleChange }
                   />;
    inputBoxElements.push(inputBox);
  }

  // change list of divs to list of <li>'s
  const inputBoxListItems = inputBoxElements.map((inputBox) =>
    <li>{ inputBox }</li>
  );

  return (
    <div>
      <ul className="input-ul">
        { inputBoxListItems }
        <button onClick={ props.handlePositiveButtonPress } className="input-box-button"> &#43; </button>
        <button onClick={ props.handleNegativeButtonPress } className="input-box-button"> &minus; </button>
      </ul>
    </div>
  );
}

export default InputContainer;