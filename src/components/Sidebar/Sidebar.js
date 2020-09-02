import React from "react";
import "rc-slider/assets/index.css";
import PropTypes from "prop-types";

import styles from "./Sidebar.module.css";
import Filters from "../UI/Filters/Filters";
import Preloader from "../UI/Preloader/Preloader";

const Sidebar = ({ rangePrices }) => {
  return (
    <div className={styles.sidebar}>
      {rangePrices[0] >= 0 && rangePrices[1] > 0 ? (
        <Filters />
      ) : (
        <Preloader type="filter" />
      )}
    </div>
  );
};

Sidebar.propTypes = {
  rangePrices: PropTypes.array,
};

export default Sidebar;
