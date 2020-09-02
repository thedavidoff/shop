import React from "react";

import styles from "./SubmitFilterBlock.module.css";

const SubmitFilterBlock = ({ totalFilterCount, isVisible, style }) => {
  return isVisible ? (
    <div className={styles.submitFilterBlock} style={style}>
      <span className={styles.totalFilterCount}>
        Выбрано: <b>{totalFilterCount}</b>
      </span>
      <button className={styles.submitFilterButton}>Показать</button>
    </div>
  ) : null;
};

export default SubmitFilterBlock;
