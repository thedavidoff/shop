import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useLocation, withRouter } from "react-router-dom";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import styles from "./Sidebar.module.css";
import { filterProductsByPriceRequest } from "../../redux/homeReducer";

const Sidebar = ({ filterProductsByPriceRequest, history }) => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const minPrice = +query.get("minPrice");
  const maxPrice = +query.get("maxPrice");

  const min = 1126;
  const max = 12791;
  const [rangeValues, setRangeValues] = useState([minPrice || 1126, maxPrice || 12791]);
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
    rangeValues[0] > min && history.push(`/shop?minPrice=${rangeValues[0]}`);
    rangeValues[1] < max && history.push(`/shop?maxPrice=${rangeValues[1]}`);
    rangeValues[0] > min &&
      rangeValues[1] < max &&
      history.push(
        `/shop?minPrice=${rangeValues[0]}&maxPrice=${rangeValues[1]}`
      );
    rangeValues[0] === min && rangeValues[1] === max && history.push("/shop");
    filterProductsByPriceRequest([rangeValues[0], rangeValues[1]]);
  };

  useEffect(() => {
    setRangeValues(
      minPrice || maxPrice
        ? [
            minPrice ? minPrice : rangeValues[0],
            maxPrice ? maxPrice : rangeValues[1],
          ]
        : rangeValues
    );
    setInputValues(
      minPrice || maxPrice
        ? [
            minPrice ? minPrice : rangeValues[0],
            maxPrice ? maxPrice : rangeValues[1],
          ]
        : rangeValues
    );
    filterProductsByPriceRequest([
      minPrice ? minPrice : rangeValues[0],
      maxPrice ? maxPrice : rangeValues[1],
    ]);
  }, [minPrice, maxPrice]);

  return (
    <div className={styles.sidebar}>
      <h4>Фильтры</h4>
      <div className={styles.priceBlock}>
        <p>Цена, грн:</p>
        <input
          type="number"
          value={
            inputValues && inputValues[0] !== min
              ? inputValues[0]
              : rangeValues[0] === min
              ? ""
              : rangeValues[0]
          }
          placeholder={min}
          onChange={handleMinInputChange}
          onBlur={handleMinInputBlur}
        />
        {" - "}
        <input
          type="number"
          value={
            inputValues && inputValues[1] !== max
              ? inputValues[1]
              : rangeValues[1] === max
              ? ""
              : rangeValues[1]
          }
          placeholder={max}
          onChange={handleMaxInputChange}
          onBlur={handleMaxInputBlur}
        />
      </div>
      <Range
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

export default compose(
  withRouter,
  connect(null, { filterProductsByPriceRequest })
)(Sidebar);
