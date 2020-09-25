import React from "react";
import { TextField, FormControlLabel } from "@material-ui/core";

import styles from "./errors.module.css";
import Preloader from "../UI/Preloader/Preloader";
import { RememberMeCheckbox } from "../UI/Checkbox/Checkbox";

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
  id,
  name,
  type,
  label,
  meta: { touched, invalid, error },
  input,
}) => {
  return (
    <>
      <TextField
        id={id}
        name={name}
        type={type}
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        size="small"
        variant="outlined"
        style={{ marginTop: 24 }}
        {...input}
      />
    </>
  );
};

export const checkbox = ({ id, name, label, input }) => {
  return (
    <FormControlLabel
      control={
        <RememberMeCheckbox
          size="small"
          color="primary"
          defaultChecked
          id={id}
          name={name}
          onChange={input.onChange}
        />
      }
      style={{ margin: "13px 0" }}
      label={label}
    />
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

export const selectProfile = ({ input, meta: { touched, error, warning } }) => {
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
