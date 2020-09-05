import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

import styles from "./SearchCity.module.css";

const searchOptions = (keys) => ({
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [...keys],
});

const filterList = (list, filter) => {
  if (!filter) return list;
  const fuse = new Fuse(list, searchOptions(["name"]));
  return fuse.search(filter);
};

const fetchList = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

const SearchList = ({ handleSelectCity, filter }) => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const url = "http://localhost:3001/cities";

  useEffect(() => {
    fetchList(url).then((data) => {
      let result = [];
      data.map(
        (d) =>
          (result = [
            ...result,
            ...d.areas.reduce((acc, item) => {
              acc.push({ ...item, name: `${item.name} (${d.name})` });
              return acc;
            }, []),
          ])
      );
      setList(result);
    });
  }, [url]);

  useEffect(() => {
    setFilteredList(filterList(list, filter));
  }, [filter, list]);

  return filter ? (
    <ul className={styles.searchList}>
      {filteredList.slice(0, 10).map((it) => {
        return (
          <li
            onClick={handleSelectCity}
            key={it.id ? it.id : it.item && it.item.id}
          >
            {it.item && it.item.name}
          </li>
        );
      })}
    </ul>
  ) : null;
};

export default SearchList;
