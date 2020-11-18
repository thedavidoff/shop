import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { makeStyles, List, ListItem } from "@material-ui/core";

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

const useStyles = makeStyles((theme) => ({
  list: {
    position: "absolute",
    display: "inline-block",
    marginTop: 68,
    padding: 0,
    listStyle: "none",
    background: "#fff",
    fontSize: 16,
    border: "1px solid cadetblue",
    zIndex: 1,
  },
  listItem: {
    padding: "3px 5px",
    "&:hover": {
      cursor: "pointer",
      color: "#fff",
      background: theme.palette.primary.main,
    },
  },
}));

const SearchList = ({ handleSelectCity, filter }) => {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const url = "/cities";

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
    <List className={classes.list}>
      {filteredList.slice(0, 10).map((it) => {
        return (
          <ListItem
            className={classes.listItem}
            onClick={handleSelectCity}
            key={it.id ? it.id : it.item && it.item.id}
            disableGutters
          >
            {it.item && it.item.name}
          </ListItem>
        );
      })}
    </List>
  ) : null;
};

export default SearchList;
