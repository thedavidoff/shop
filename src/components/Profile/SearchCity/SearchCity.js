import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import styles from "./SearchCity.module.css";
import SearchList from "./SearchList";

const delay = 400;

const SearchCity = ({ city, newCity, handleSelectCity }) => {
  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState("");
  const [debouncedSetFilter] = useDebouncedCallback(
    (filter) => setFilter(filter),
    delay
  );

  const handleChangeSearch = (e) => {
    const { value } = e.target;
    setSearchString(value);
    debouncedSetFilter(value);
  };

  return (
    <div className={styles.searchCity}>
      <h3>{`Сейчас указан: ${newCity || city}`}</h3>
      <p>Чтобы изменить город:</p>
      <input
        type="text"
        value={searchString}
        onChange={handleChangeSearch}
        placeholder="Начните вводить название"
        autoFocus
      />
      <p>Или выберите из списка:</p>
      <SearchList handleSelectCity={handleSelectCity} filter={filter} />
      <ul className={styles.cityFastSelect}>
        <li onClick={handleSelectCity}>Киев (Киевская обл)</li>
        <li onClick={handleSelectCity}>Харьков (Харьковская обл)</li>
        <li onClick={handleSelectCity}>Одесса (Одесская обл)</li>
        <li onClick={handleSelectCity}>Днепр (Днепропетровская обл)</li>
        <li onClick={handleSelectCity}>Львов (Львовская обл)</li>
      </ul>
    </div>
  );
};

export default SearchCity;
