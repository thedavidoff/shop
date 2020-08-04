import React from "react";
import { Field, reduxForm } from "redux-form";

import styles from "./LoginForm.module.css";
import { email, minLength6 } from "../validate";
import { input } from "../renderFields";

let LoginForm = ({ error, pristine, submitting, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <h5>Вход в личный кабинет:</h5>
      <span>Ваш e-mail:</span>
      <br />
      <Field
        id="email"
        name="email"
        type="text"
        placeholder="e-mail"
        component={input}
        validate={[email]}
      />
      <span>Пароль:</span>
      <br />
      <Field
        id="password"
        name="password"
        type="password"
        placeholder="пароль"
        component={input}
        validate={[minLength6]}
      />
      <label>
        <Field
          id="rememberMe"
          name="rememberMe"
          type="checkbox"
          component={input}
        />{" "}
        Запомнить меня
      </label>
      <br />
      <button disabled={pristine || submitting}>Войти</button>
      {error ? <p className={styles.errorMessage}>{error}</p> : null}
    </form>
  );
};

LoginForm = reduxForm({
  form: "LoginForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(LoginForm);

export default LoginForm;
