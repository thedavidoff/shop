import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, InputBase, Button, Paper } from "@material-ui/core";
import { Highlight, connectAutoComplete } from "react-instantsearch-dom";
import AutoSuggest from "react-autosuggest";

import Pagination from "../Pagination/Pagination";

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: 3,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  link: {
    padding: 4,
    textTransform: "inherit",
  },
  hitColumn: {
    display: "flex",
    flexDirection: "column",
  },
  leftHitColumn: {
    marginRight: 8,
    alignItems: "center",
  },
  rightHitColumn: {
    alignItems: "top",
  },
  name: {
    marginBottom: 5,
    fontSize: 12,
    lineHeight: 1.5,
    fontWeight: "bold",
  },
  price: {
    marginTop: 1,
    padding: "0 5px",
    background: "#fff",
    fontSize: 12,
    color: theme.palette.error.main,
    whiteSpace: "nowrap",
    borderRadius: 4,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
  },
}));

const Autocomplete = (props) => {
  const classes = useStyles();

  let [value, setValue] = useState(props.currentRefinement);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    props.refine(value);
  };

  const onSuggestionsClearRequested = () => {
    props.refine();
  };

  const getSuggestionValue = (hit) => {
    return hit.name;
  };

  const renderSuggestion = (hit) => {
    return (
      <div>
        <Button
          component={NavLink}
          to={`/shop/video_cards/${hit.id}`}
          className={classes.link}
        >
          <div className={`${classes.hitColumn} ${classes.leftHitColumn}`}>
            <img src={hit.photoInSearch} alt={hit.name} />
            <div className={classes.price}>{`${hit.price} грн`}</div>
          </div>
          <div className={`${classes.hitColumn} ${classes.rightHitColumn}`}>
            <Highlight
              attribute="name"
              hit={hit}
              tagName="mark"
              className={classes.name}
            />
            <Highlight
              attribute="description"
              hit={hit}
              tagName="mark"
              className={classes.description}
            />
          </div>
        </Button>
      </div>
    );
  };

  function renderSuggestionsContainer({ containerProps, children }) {
    return (
      <Paper elevation={15} {...containerProps}>
        {children}
        {children ? <Pagination /> : null}
      </Paper>
    );
  }

  const renderInputComponent = (inputProps) => (
    <InputBase
      id="search"
      label="Поиск"
      variant="outlined"
      placeholder="Начните вводить Ваш запрос..."
      fullWidth
      classes={{
        input: classes.input,
      }}
      {...inputProps}
      type="search"
    />
  );

  const inputProps = {
    onChange: onChange,
    value,
  };

  return (
    <AutoSuggest
      suggestions={props.hits}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderSuggestionsContainer={renderSuggestionsContainer}
      renderInputComponent={renderInputComponent}
      inputProps={inputProps}
    />
  );
};

export default connectAutoComplete(Autocomplete);
