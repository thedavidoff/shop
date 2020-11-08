import React from "react";
import { connectStats, connectSearchBox } from "react-instantsearch-dom";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    "& input": {
      backgroundColor: "#fff",
      borderRadius: 4
    }
  },
}));

const SearchBox = ({ currentRefinement, refine, nbHits }) => {
  const classes = useStyles();

  return (
    <form noValidate action="" role="search">
      <TextField
        id="search"
        label="Поиск"
        variant="outlined"
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        placeholder={`Искать среди ${nbHits} товаров`}
        fullWidth
        margin="dense"
        classes={{
          root: classes.search,
        }}
      />
    </form>
  );
};

export default connectStats(connectSearchBox(SearchBox));
