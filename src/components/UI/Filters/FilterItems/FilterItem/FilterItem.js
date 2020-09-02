import React, { useState } from "react";

import styles from "./FilterItem.module.css";
import TriangleRightSVG from "../../../SVG/TriangleRightSVG";
import TriangleDownSVG from "../../../SVG/TriangleDownSVG";

const FilterItem = ({
  fieldValues,
  name,
  field,
  isOpen,
  selectedFilters,
  toggleVisibleSubmitFilterBlock,
}) => {
  const [toggleVisible, setToggleVisible] = useState(isOpen);
  const [isSelectedCheckbox, setIsSelectedCheckbox] = useState([]);

  const handleVisibleFilterToggle = () => {
    setToggleVisible(!toggleVisible);
  };

  const handleClick = (e) => {
    const el = e.currentTarget;
    toggleVisibleSubmitFilterBlock(e);
    el.checked
      ? setIsSelectedCheckbox([...isSelectedCheckbox, el.id])
      : setIsSelectedCheckbox(
          [...isSelectedCheckbox].filter((id) => id !== el.id)
        );
  };

  return (
    <>
      <div className={styles.filterItem} onClick={handleVisibleFilterToggle}>
        {name}
        {toggleVisible ? <TriangleDownSVG /> : <TriangleRightSVG />}
      </div>
      {toggleVisible && (
        <ul className={styles.listOfFilterFields}>
          {fieldValues &&
          Object.values(fieldValues)[0].prop.map((item, index) => (
              <li key={index}>
                <input
                  id={field + index}
                  type="checkbox"
                  value={item}
                  name={field}
                  disabled={Object.values(fieldValues)[0].val[index] === 0}
                  onClick={handleClick}
                />
                <label
                  htmlFor={field + index}
                  style={Object.values(fieldValues)[0].val[index] === 0 ? { opacity: 0.5 } : null}
                >
                  {selectedFilters &&
                  selectedFilters.some((item) => item === field)
                    ? isSelectedCheckbox.some((item) => item === field + index)
                      ? item
                      : item + ` (+${Object.values(fieldValues)[0].val[index]})`
                    : item + ` (${Object.values(fieldValues)[0].val[index]})`}
                </label>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

// {fieldValues && Object.values(fieldValues)[0] &&
// Object.values(Object.values(fieldValues)[0]).filter(f => Object.values(f)[0].value).map((val, index) => (
//   <li key={index}>
//     <input
//       id={field + index}
//       type="checkbox"
//       value={val}
//       name={field}
//       onClick={toggleVisibleSubmitFilterBlock}
//     />
//     <label htmlFor={field + index}>{val}</label>
//   </li>
// ))}

export default FilterItem;
