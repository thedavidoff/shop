import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import "rc-slider/assets/index.css";

import { setCurrentRefinement } from "../../redux/homeReducer";
import FilterCheckboxList from "../UI/FilterCheckboxList/FilterCheckboxList";
import FilterAccordion from "../UI/FilterAccordion/FilterAccordion";
import SkeletonFilterCheckbox from "../UI/SkeletonFilterCheckbox/SkeletonFilterCheckbox";

const useStyles = makeStyles(() => ({
  sidebar: {
    padding: 15,
    background: "#c2daf0",
  },
}));

const Sidebar = ({
  isFetchingFilterFields,
  filterFields,
  initialFacets,
  currentRefinement,
  setCurrentRefinement,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
      {isFetchingFilterFields
        ? Array(19)
            .fill(undefined, undefined, undefined)
            .map((_, index) => <SkeletonFilterCheckbox key={index} />)
        : Object.keys(currentRefinement).length > 0 &&
          filterFields.map(({ name, field, isOpen }) => {
            return (
              <FilterAccordion
                key={field}
                id={field}
                heading={name}
                isOpen={isOpen}
              >
                <FilterCheckboxList
                  attribute={`specifications.${field}.value`}
                  fields={initialFacets[field]}
                  field={field}
                  currentRefinement={currentRefinement[field]}
                  setCurrentRefinement={setCurrentRefinement}
                  limit={100}
                />
              </FilterAccordion>
            );
          })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetchingFilterFields: state.homePage.isFetchingFilterFields,
    filterFields: state.homePage.filterFields,
    initialFacets: state.homePage.initialFacets,
    currentRefinement: state.homePage.currentRefinement,
    setCurrentRefinement: setCurrentRefinement,
  };
};

export default connect(mapStateToProps, { setCurrentRefinement })(Sidebar);
