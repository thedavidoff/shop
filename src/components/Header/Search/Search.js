import React from "react";

import styles from './Search.module.css'

const Search = () => {
  return (
    <div className={styles.search}>
      <input type="search" placeholder="Искать среди ??? товаров" />
      <button>Найти</button>
    </div>
  )
};

export default Search