import React from "react";
import {
  withStyles,
  TextareaAutosize,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

import styles from "./errors.module.css";
import Preloader from "../UI/Preloader/Preloader";
import {
  PrimaryColorCheckbox,
  GrayColorCheckbox,
} from "../UI/Checkbox/Checkbox";
import RadioButton from "../UI/RadioButton/RadioButton";

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
  meta: { touched, error, warning },
}) => {
  const hasError = touched && error;
  const hasWarning = touched && warning;

  return (
    <>
      <TextareaAutosize
        className={hasError || hasWarning ? styles.textarea : ""}
        {...input}
        placeholder={placeholder}
        aria-label="Textarea"
        rowsMin={3}
        style={{
          width: "100%",
          padding: "5px 10px",
          fontSize: 16,
          borderRadius: 4,
          resize: "vertical",
          borderColor: "#c4c4c4"
        }}
      />
      {touched &&
        ((error && (
          <Typography className={styles.textareaMessage}>
            <span>{error}</span>
          </Typography>
        )) ||
          (warning && (
            <Typography className={styles.textareaMessage}>
              <span>{warning}</span>
            </Typography>
          )))}
    </>
  );
};

export const radio = ({ input, ...props }) => {
  return (
    <FormControl>
      <RadioGroup
        {...input}
        {...props}
      >
        <FormControlLabel
          value="1"
          control={<RadioButton />}
          label="- у Вас в магазине"
          style={{ marginLeft: 0 }}
        />
        <FormControlLabel
          value="2"
          control={<RadioButton />}
          label="- в другом магазине"
          style={{ marginLeft: 0 }}
        />
        <FormControlLabel
          value="3"
          control={<RadioButton />}
          label="- не покупал(а), но хочу поделиться мнением"
          style={{ marginLeft: 0 }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export const input = ({
  id,
  name,
  type,
  label,
  meta: { touched, invalid, error },
  input,
  style,
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
      style={style || { marginTop: 24 }}
      {...input}
    />
  );
};

export const checkbox = ({ id, name, label, input }) => {
  return (
    <FormControlLabel
      control={
        <GrayColorCheckbox
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
        style={type === "hidden" ? { opacity: 0 } : {}}
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
