import React, { useEffect, useState } from "react";
import { NavLink, useLocation, withRouter } from "react-router-dom";
import { Range } from "rc-slider/es";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import styles from "../../Sidebar/Sidebar.module.css";
import { filterProductsByPriceRequest } from "../../../redux/homeReducer";

const Filter = ({ rangePrices, filterProductsByPriceRequest, history }) => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const minPrice = +query.get("minPrice");
  const maxPrice = +query.get("maxPrice");

  const [sliderValues, setSliderValues] = useState(
    minPrice || maxPrice ? [minPrice, maxPrice] : rangePrices
  );

  const [inputValues, setInputValues] = useState();

  const handleRangeChange = (val) => {
    setSliderValues(val);
    setInputValues(val);
  };
  const handleMinInputChange = (e) => {
    setInputValues([e.target.value, sliderValues[1]]);
  };
  const handleMaxInputChange = (e) => {
    setInputValues([sliderValues[0], e.target.value]);
  };
  const handleMinInputBlur = () => {
    setSliderValues([+inputValues[0], sliderValues[1]]);
  };
  const handleMaxInputBlur = () => {
    setSliderValues([sliderValues[0], +inputValues[1]]);
  };
  const handleSubmit = () => {
    sliderValues[0] > rangePrices[0] &&
      history.push(`/shop?minPrice=${sliderValues[0]}`);
    sliderValues[1] < rangePrices[1] &&
      history.push(`/shop?maxPrice=${sliderValues[1]}`);
    sliderValues[0] > rangePrices[0] &&
      sliderValues[1] < rangePrices[1] &&
      history.push(
        `/shop?minPrice=${sliderValues[0]}&maxPrice=${sliderValues[1]}`
      );
    sliderValues[0] === rangePrices[0] &&
      sliderValues[1] === rangePrices[1] &&
      history.push("/shop");
    filterProductsByPriceRequest(sliderValues);
  };

  const handleClearFilters = () => {
    setSliderValues(rangePrices);
    setInputValues(rangePrices);
  };

  useEffect(() => {
    if (minPrice === 0 && maxPrice === 0) {
      setSliderValues(rangePrices);
      setInputValues(rangePrices);
    } else {
      setSliderValues([
        minPrice ? minPrice : sliderValues[0],
        maxPrice ? maxPrice : sliderValues[1],
      ]);
      setInputValues([
        minPrice ? minPrice : sliderValues[0],
        maxPrice ? maxPrice : sliderValues[1],
      ]);
      filterProductsByPriceRequest([
        minPrice ? minPrice : rangePrices[0] || sliderValues[0],
        maxPrice ? maxPrice : rangePrices[1] || sliderValues[1],
      ]);
    }
  }, [minPrice, maxPrice]);

  return (
    <>
      <h4>Фильтры</h4>
      {minPrice || maxPrice ? (
        <NavLink className={styles.clearFilters} to="/shop">
          <span onClick={handleClearFilters}>Сбросить фильтры</span>
        </NavLink>
      ) : null}
      <div className={styles.priceBlock}>
        <p>Цена, грн:</p>
        <input
          type="number"
          value={
            inputValues && inputValues[0] !== rangePrices[0]
              ? inputValues[0]
              : sliderValues[0] === rangePrices[0]
              ? ""
              : sliderValues[0]
          }
          placeholder={rangePrices[0]}
          onChange={handleMinInputChange}
          onBlur={handleMinInputBlur}
        />
        {" - "}
        <input
          type="number"
          value={
            inputValues && inputValues[1] !== rangePrices[1]
              ? inputValues[1]
              : sliderValues[1] === rangePrices[1]
              ? ""
              : sliderValues[1]
          }
          placeholder={rangePrices[1]}
          onChange={handleMaxInputChange}
          onBlur={handleMaxInputBlur}
        />
      </div>
      <Range
        min={rangePrices[0]}
        max={rangePrices[1]}
        defaultValue={rangePrices}
        value={sliderValues}
        className={styles.rcSlider}
        onChange={handleRangeChange}
      />
      <div className={styles.priceSubmit}>
        <button onClick={handleSubmit}>Применить</button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    rangePrices: state.homePage.rangePrices,
  };
};

Filter.propTypes = {
  rangePrices: PropTypes.array,
  filterProductsByPriceRequest: PropTypes.func,
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    filterProductsByPriceRequest,
  })
)(Filter);
