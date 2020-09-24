import React from "react";
import { Field, reduxForm } from "redux-form";
import { makeStyles, Typography, Button } from "@material-ui/core";

import { email, minLength6 } from "../validate";
import { input } from "../renderFields";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    padding: "20px 24px 24px",
  },
  typography: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    marginTop: 24,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    textTransform: "none",
    padding: "3px 15px",
    fontSize: 14,
    "&:hover": { backgroundColor: theme.palette.primary.dark },
  },
  error: {
    margin: "4px 14px 0",
    fontSize: 12,
    lineHeight: 1,
    color: theme.palette.error.main,
  },
}));

let RegForm = ({ error, pristine, submitting, handleSubmit }) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Typography className={classes.typography}>Регистрация:</Typography>
      <Field
        id="email"
        name="email"
        type="text"
        label="Ваш e-mail:"
        component={input}
        validate={[email]}
      />
      <Field
        id="password"
        name="password"
        type="password"
        label="Придумайте пароль"
        component={input}
        validate={[minLength6]}
      />

      <Button
        variant="contained"
        size="small"
        type="submit"
        className={classes.button}
        disabled={pristine || submitting}
      >
        Зарегистрироваться
      </Button>
      {error ? (
        <Typography className={classes.error}>{error}</Typography>
      ) : null}
    </form>
  );
};

RegForm = reduxForm({
  form: "RegForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(RegForm);

export default RegForm;
