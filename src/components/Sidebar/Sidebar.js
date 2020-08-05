import React, { useState } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import styles from "./Sidebar.module.css";
import handleSubmit from "redux-form/lib/handleSubmit";

const Sidebar = (props) => {
  const min = 1126;
  const max = 12791;
  const [rangeValues, setRangeValues] = useState([1126, 12791]);
  const [inputValues, setInputValues] = useState();

  const handleRangeChange = (val) => {
    setRangeValues(val);
    setInputValues(val);
  };
  const handleMinInputChange = (e) => {
    setInputValues([e.target.value, rangeValues[1]]);
  };
  const handleMaxInputChange = (e) => {
    setInputValues([rangeValues[0], e.target.value]);
  };
  const handleMinInputBlur = () => {
    setRangeValues([+inputValues[0], rangeValues[1]]);
  };
  const handleMaxInputBlur = () => {
    setRangeValues([rangeValues[0], +inputValues[1]]);
  };
  const handleSubmit = () => {
    console.log(rangeValues[0], rangeValues[1])
  };

  return (
    <div className={styles.sidebar}>
      <h4>Фильтры</h4>
      <div className={styles.priceBlock}>
        <p>Цена, грн:</p>
        <input
          type="number"
          value={inputValues && inputValues[0] !== min ? inputValues[0] : rangeValues[0] === min ? "" : rangeValues[0]}
          placeholder={min}
          onChange={handleMinInputChange}
          onBlur={handleMinInputBlur}
        />
        {" - "}
        <input
          type="number"
          value={inputValues && inputValues[1] !== max ? inputValues[1] : rangeValues[1] === max ? "" : rangeValues[1]}
          placeholder={max}
          onChange={handleMaxInputChange}
          onBlur={handleMaxInputBlur}
        />
      </div>
      <Range
        startPoint={0}
        included={true}
        min={min}
        max={max}
        defaultValue={[min, max]}
        value={rangeValues}
        className={styles.rcSlider}
        onChange={handleRangeChange}
      />
      <div className={styles.priceSubmit}>
        <button onClick={handleSubmit}>Применить</button>
      </div>
    </div>
  );
};

export default Sidebar;
