import React from "react";
import { withStyles, Checkbox as MUICheckbox } from "@material-ui/core";

const Checkbox = withStyles({
  root: {
    paddingLeft: 0,
    color: "#b3b9c3",
  },
})((props) => <MUICheckbox color="default" {...props} />);

export default Checkbox;
