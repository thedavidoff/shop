import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { List, ListItem, makeStyles, Typography } from "@material-ui/core";

import SearchList from "./SearchList";

const delay = 400;

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    marginBottom: 0,
    padding: 0,
  },
  listItem: {
    margin: "5px 10px 5px 0",
    fontSize: 16,
    borderBottom: "1px dashed",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.secondary.main,
    },
  },
}));

const SearchCity = ({ city, newCity, handleSelectCity }) => {
  const classes = useStyles();
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
    <div>
      <Typography component="h3" className={classes.title}>{`Сейчас указан: ${
        newCity || city
      }`}</Typography>
      <Typography>Чтобы изменить город:</Typography>
      <input
        type="text"
        value={searchString}
        onChange={handleChangeSearch}
        placeholder="Начните вводить название"
        autoFocus
      />
      <Typography>Или выберите из списка:</Typography>
      <SearchList handleSelectCity={handleSelectCity} filter={filter} />
      <List className={classes.list}>
        <ListItem
          className={classes.listItem}
          onClick={handleSelectCity}
          disableGutters
        >
          Киев (Киевская обл)
        </ListItem>
        <ListItem
          className={classes.listItem}
          onClick={handleSelectCity}
          disableGutters
        >
          Харьков (Харьковская обл)
        </ListItem>
        <ListItem
          className={classes.listItem}
          onClick={handleSelectCity}
          disableGutters
        >
          Одесса (Одесская обл)
        </ListItem>
        <ListItem
          className={classes.listItem}
          onClick={handleSelectCity}
          disableGutters
        >
          Днепр (Днепропетровская обл)
        </ListItem>
        <ListItem
          className={classes.listItem}
          onClick={handleSelectCity}
          disableGutters
        >
          Львов (Львовская обл)
        </ListItem>
      </List>
    </div>
  );
};

export default SearchCity;
