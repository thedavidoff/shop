import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Configure } from "react-instantsearch-dom";

import Autocomplete from "../../UI/Autocomplete/Autocomplete";

const useStyles = makeStyles((theme) => ({
  search: {
    maxWidth: 1340,
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
    padding: 16,
    width: 700,
    height: 70,
    background: theme.palette.primary.main,
    borderRadius: 4,
    margin: "0 16px 0",
    "& .react-autosuggest__container": {
      width: "100%",
    },
    "& .react-autosuggest__suggestions-container": {
      position: "relative",
      marginTop: 1,
      backgroundColor: "#fff",
      color: "#000",
      zIndex: 1,
      "& ul": {
        margin: 0,
        padding: 10,
        listStyle: "none",
        "& li": {
          "& img": {
            borderRadius: 4,
          },
          "& a:hover": {
            color: "#fff",
            backgroundColor: theme.palette.primary.light,
          },
          "& .ais-Highlight:first-child": {
            display: "block",
            fontWeight: "bold",
          },
        },
      },
    },
  },
}));

const Search = () => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <Configure hitsPerPage={5} />
      <Autocomplete />
    </div>
  );
};

export default Search;
