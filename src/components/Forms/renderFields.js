import React from "react";

import styles from "./errors.module.css";
import Preloader from "../UI/Preloader/Preloader";

export const textarea = ({
  input,
  placeholder,
  id,
  meta: { touched, error, warning },
}) => {
  const hasError = touched && error;
  const hasWarning = touched && warning;
  return (
    <>
      <textarea
        className={hasError || hasWarning ? `${styles.textarea}` : ""}
        {...input}
        placeholder={placeholder}
        id={id}
      />
      {touched &&
        ((hasError && (
          <p className={styles.textareaMessage}>
            <i>{error}</i>
          </p>
        )) ||
          (hasWarning && (
            <p className={styles.textareaMessage}>
              <i>{warning}</i>
            </p>
          )))}
    </>
  );
};

export const input = ({
  input,
  type,
  placeholder,
  id,
  meta: { touched, error, warning },
}) => {
  const hasError = touched && error;
  const hasWarning = touched && warning;
  return (
    <>
      <input
        className={hasError || hasWarning ? `${styles.input}` : ""}
        {...input}
        type={type}
        placeholder={placeholder}
        id={id}
      />
      {touched &&
        ((hasError && <p className={styles.inputMessage}>{error}</p>) ||
          (hasWarning && <p className={styles.inputMessage}>{warning}</p>))}
    </>
  );
};

export const inputProfile = ({
  input,
  type,
  disabled,
  placeholder,
  id,
  meta: { touched, error, warning },
  loadedSuccess,
}) => {
  const hasError = touched && error;
  const hasWarning = touched && warning;

  return (
    <>
      <input
        className={
          hasError || hasWarning ? `${styles.input} ${styles.inputProfile}` : ""
        }
        {...input}
        type={type}
        placeholder={placeholder}
        id={id}
        disabled={disabled}
        style={{ position: "relative" }}
      />

      {!loadedSuccess && <Preloader type="inputProfile" />}

      {touched &&
        ((hasError && (
          <p className={styles.inputMessage}>
            <i>{error}</i>
          </p>
        )) ||
          (hasWarning && (
            <p className={styles.inputMessage}>
              <i>{warning}</i>
            </p>
          )))}
    </>
  );
};

export const selectProfile = ({
  input,
  meta: { touched, error, warning },
}) => {
  const hasError = touched && error;
  const hasWarning = touched && warning;

  return (
    <>
      <select
        className={
          hasError || hasWarning ? `${styles.input} ${styles.inputProfile}` : ""
        }
        {...input}
        style={{ position: "relative" }}
      >
        <option value={0}>Выбрать пол</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </select>

      {touched &&
        ((hasError && (
          <p className={styles.inputMessage}>
            <i>{error}</i>
          </p>
        )) ||
          (hasWarning && (
            <p className={styles.inputMessage}>
              <i>{warning}</i>
            </p>
          )))}
    </>
  );
};
