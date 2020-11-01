import React from "react";
import { withStyles, makeStyles, Checkbox, FormControlLabel } from "@material-ui/core";

export const GrayColorCheckbox = withStyles({
  root: {
    color: "#b3b9c3",
  },
})((props) => <Checkbox color="default" {...props} />);

export const PrimaryColorCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, .15)",
    },
  },
}))((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  controlLabel: {
    margin: 0,
    fontSize: 13,
    "&:hover": {
      color: theme.palette.secondary.main
    }
  },
  checkbox: {
    marginRight: 5,
    padding: 3,
  }
}));

export const FilterCheckbox = (props) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={<GrayColorCheckbox className={classes.checkbox} {...props} />}
      label={props.label}
      className={classes.controlLabel}
    />
  );
};