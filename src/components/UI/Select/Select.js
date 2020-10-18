import React from "react";
import {
  makeStyles,
  FormControl,
  Select as MUISelect,
  FormHelperText
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 14,
    "& select": {
      padding: "2px 5px",
    },
  },
}));

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
};

const Select = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <FormControl error={!!touched && !!error}>
      <MUISelect
        native
        {...input}
        {...rest}
        inputProps={{
          name: "gender",
          id: "gender",
        }}
        className={classes.root}
      >
        {children}
      </MUISelect>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};

export default Select;
