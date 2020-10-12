import React from "react";
import { makeStyles, Radio } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: 5,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, .15)",
    },
  },
});

const RadioButton = (props) => {
  const classes = useStyles();

  return <Radio className={classes.root} color="primary" {...props} />;
};

export default RadioButton;
