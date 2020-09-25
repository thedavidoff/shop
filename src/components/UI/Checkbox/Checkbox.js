import React from "react";
import { withStyles, Checkbox } from "@material-ui/core";

export const RememberMeCheckbox = withStyles({
  root: {
    paddingLeft: 0,
    color: "#b3b9c3",
  },
})((props) => <Checkbox color="default" {...props} />);

export const PrimaryColorCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
  },
}))((props) => <Checkbox color="default" {...props} />);
