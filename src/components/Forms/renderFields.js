import React from "react";
import { TextField, FormControlLabel, withStyles } from "@material-ui/core";

import styles from "./errors.module.css";
import Preloader from "../UI/Preloader/Preloader";
import {
  PrimaryColorCheckbox,
  RememberMeCheckbox,
} from "../UI/Checkbox/Checkbox";

const ProfileTextField = withStyles({
  root: {
    "& input": {
      padding: "2px 5px",
      fontSize: 14,
    },
  },
})(TextField);

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
  id,
  meta: { touched, invalid, error },
  loadedSuccess,
}) => {
  return (
    <>
      <ProfileTextField
        id={id}
        type={type}
        error={touched && invalid}
        helperText={touched && error}
        size="small"
        variant="outlined"
        disabled={disabled}
        {...input}
      />
      {!loadedSuccess && <Preloader type="inputProfile" />}
    </>
  );
};

export const checkboxProfile = ({ name, label, input, loadedSuccess }) => {
  return (
    <>
      <FormControlLabel
        control={
          <PrimaryColorCheckbox
            name={name}
            size="small"
            color="primary"
            checked={!!input.value}
            onChange={input.onChange}
          />
        }
        label={label}
      />
      {!loadedSuccess && <Preloader type="inputProfile" />}
    </>
  );
};
