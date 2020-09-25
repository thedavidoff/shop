import React from "react";
import { makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  arrow: {
    color: "#222",
  },
  tooltip: {
    fontSize: 13,
    backgroundColor: "#222",
  },
}));

const DarkTooltip = (props) => {
  const classes = useStyles();

  return (
    <Tooltip arrow classes={classes} {...props}>
      {props.children}
    </Tooltip>
  );
};

export default DarkTooltip;
