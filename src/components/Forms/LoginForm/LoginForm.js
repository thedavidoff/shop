import React from "react";
import { Field, reduxForm } from "redux-form";
import { makeStyles, Typography, Button } from "@material-ui/core";

import { email, minLength6 } from "../validate";
import { checkbox, input } from "../renderFields";

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

let LoginForm = ({ error, pristine, submitting, handleSubmit }) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Typography className={classes.typography}>
        Вход в личный кабинет:
      </Typography>
      <Field
        id="email"
        name="email"
        type="text"
        label="Ваш e-mail:"
        component={input}
        validate={email}
      />
      <Field
        id="password"
        name="password"
        type="password"
        label="Пароль:"
        component={input}
        validate={minLength6}
      />
      <Field
        id="rememberMe"
        name="rememberMe"
        label="Запомнить меня"
        component={checkbox}
      />{" "}
      <Button
        variant="contained"
        size="small"
        type="submit"
        className={classes.button}
        disabled={pristine || submitting}
      >
        Войти
      </Button>
      {error ? (
        <Typography className={classes.error}>{error}</Typography>
      ) : null}
    </form>
  );
};

LoginForm = reduxForm({
  form: "LoginForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(LoginForm);

export default LoginForm;
