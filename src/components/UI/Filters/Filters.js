import React, { useEffect, useState } from "react";
import { NavLink, useLocation, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { Range } from "rc-slider/es";
import * as PropTypes from "prop-types";

import styles from "./Filters.module.css";
import {
  filterProductsByPriceRequest,
  filterRequest,
} from "../../../redux/homeReducer";
import FilterItems from "./FilterItems/FilterItems";

const Filters = ({
  filterFieldsValues,
  updateFilterFieldsValues,
  rangePrices,
  filterFields,
  isFetchingFilterFields,
  totalFilterCount,
  totalProductsCount,
  selectedFilters,
  filterProductsByPriceRequest,
  filterRequest,
  history,
}) => {
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
    <div className={styles.filters}>
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
      {isFetchingFilterFields ? (
        <div>Loading...</div>
      ) : (
        <FilterItems
          filterFieldsValues={updateFilterFieldsValues.length ? updateFilterFieldsValues : filterFieldsValues}
          filterFields={filterFields}
          totalFilterCount={
            totalFilterCount > 0 ? totalFilterCount : totalProductsCount
          }
          selectedFilters={selectedFilters}
          filterRequest={filterRequest}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filterFieldsValues: state.homePage.filterFieldsValues,
    updateFilterFieldsValues: state.homePage.updateFilterFieldsValues,
    rangePrices: state.homePage.rangePrices,
    filterFields: state.homePage.filterFields,
    isFetchingFilterFields: state.homePage.isFetchingFilterFields,
    totalFilterCount: state.homePage.filteredProducts.length,
    totalProductsCount: state.homePage.products.length,
    selectedFilters: state.homePage.selectedFilters,
  };
};

Filters.propTypes = {
  filterFieldsValues: PropTypes.array,
  updateFilterFieldsValues: PropTypes.array,
  rangePrices: PropTypes.array,
  filterProductsByPriceRequest: PropTypes.func,
  filterFields: PropTypes.array,
  isFetchingFilterFields: PropTypes.bool,
  totalFilterCount: PropTypes.number,
  totalProductsCount: PropTypes.number,
  //selectedFilters: PropTypes.array,
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    filterProductsByPriceRequest,
    filterRequest,
  })
)(Filters);
