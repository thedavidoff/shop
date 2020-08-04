import React from "react";
import { Field, reduxForm } from "redux-form";

import styles from "../LoginForm/LoginForm.module.css";
import { email, minLength6 } from "../validate";
import { input } from "../renderFields";

let RegistrationForm = ({
  regFailedMessage,
  pristine,
  submitting,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <h5>Регистрация:</h5>
      <span>Укажите Ваш e-mail:</span>
      <br />
      <Field
        id="email"
        name="email"
        type="text"
        placeholder="e-mail"
        component={input}
        validate={[email]}
      />
      <span>Придумайте пароль:</span>
      <br />
      <Field
        id="password"
        name="password"
        type="password"
        placeholder="пароль"
        component={input}
        validate={[minLength6]}
      />
      <button
        className={styles.registrationButton}
        disabled={pristine || submitting}
      >
        Зарегистрироваться
      </button>
      {regFailedMessage &&
      regFailedMessage === "auth/email-already-in-use" ? (
        <p className={styles.errorMessage}>
          Пользователь с таким <b>E-mail</b> уже существует
        </p>
      ) : (
        <p>{regFailedMessage}</p>
      )}
    </form>
  );
};

RegistrationForm = reduxForm({
  form: "RegistrationForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(RegistrationForm);

export default RegistrationForm;
