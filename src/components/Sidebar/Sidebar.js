import React from "react";
import "rc-slider/assets/index.css";
import PropTypes from "prop-types";

import styles from "./Sidebar.module.css";
import Filter from "../UI/Filter/Filter";
import Preloader from "../UI/Preloader/Preloader";

const Sidebar = ({ rangePrices }) => {
  return (
    <div className={styles.sidebar}>
      {rangePrices[0] >= 0 && rangePrices[1] > 0 ? (
        <Filter />
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
