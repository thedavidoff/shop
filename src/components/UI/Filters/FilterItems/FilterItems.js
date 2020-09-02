import React, { useState } from "react";

import styles from "./FilterItem/FilterItem.module.css";
import FilterItem from "./FilterItem/FilterItem";
import SubmitFilterBlock from "../../SubmitFilterBlock/SubmitFilterBlock";

const FilterItems = ({
  filterFieldsValues,
  filterFields,
  totalFilterCount,
  selectedFilters,
  filterRequest,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [style, setStyle] = useState(false);

  const toggleVisibleSubmitFilterBlock = (e) => {
    setIsVisible(true);
    setStyle({
      top:
        e.currentTarget.getBoundingClientRect().top -
        353 +
        window.pageYOffset +
        "px",
    });
    filterRequest(e);
  };

  return (
    <div className={styles.filterItemsWrapper}>
      <SubmitFilterBlock
        totalFilterCount={totalFilterCount}
        isVisible={isVisible}
        style={style}
      />
      {filterFields.map((filter) => {
        let fieldValues = filterFieldsValues.find((val) => {
          return Object.keys(val)[0] === filter.field;
        });

        return (
          <FilterItem
            key={filter.id}
            name={filter.name}
            field={filter.field}
            isOpen={filter.isOpen}
            fieldValues={fieldValues}
            selectedFilters={selectedFilters}
            toggleVisibleSubmitFilterBlock={toggleVisibleSubmitFilterBlock}
          />
        );
      })}
    </div>
  );
};

export default FilterItems;
