import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    fontSize: 13,
    backgroundColor: theme.palette.common.black,
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
