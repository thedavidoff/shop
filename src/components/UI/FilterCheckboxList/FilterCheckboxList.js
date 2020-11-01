import React from "react";
import { makeStyles, List, ListItem } from "@material-ui/core";
import { connectRefinementList } from "react-instantsearch-dom";
import { orderBy } from "lodash";

import { FilterCheckbox } from "../Checkbox/Checkbox";

function uniqBy(items, property) {
  const seen = {};
  return items.filter((item) => {
    const val = item[property];

    if (seen[val]) {
      return false;
    } else {
      seen[val] = true;
      return true;
    }
  });
}

const useStyles = makeStyles(() => ({
  list: {
    margin: "5px 0",
    padding: 0,
  },
  listItem: {
    padding: "0 8px",
  },
}));

const FilterCheckboxList = connectRefinementList(
  ({
    items,
    refine,
    fields,
    field,
    currentRefinement,
    setCurrentRefinement,
  }) => {
    const classes = useStyles();

    const toggle = (item) => {
      item.value.forEach((value) => setCurrentRefinement(field, value));
      refine(item.value);
    };

    const combinedItems = uniqBy(
      orderBy([...items, ...fields], ["label"], "asc"),
      "label"
    )
      .slice(0, 100)
      .map((item) => {
        const isRefined = currentRefinement.includes(item.label);
        const value =
          isRefined === false
            ? [...currentRefinement, item.label]
            : [...currentRefinement].filter((label) => label !== item.label);

        return {
          ...item,
          isRefined,
          value,
        };
      });

    return (
      <div>
        <List className={classes.list}>
          {combinedItems.map((item, index) => {
            const label = !item.isRefined
              ? `${item.label} (${item.count})`
              : `${item.label}`;
            return (
              <ListItem key={index} className={classes.listItem}>
                <FilterCheckbox
                  label={label}
                  size="small"
                  color="primary"
                  checked={item.isRefined}
                  onChange={() => toggle(item)}
                />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
);

export default FilterCheckboxList;
