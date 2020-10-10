import React, { useEffect } from "react";
import * as PropTypes from "prop-types";

import Alert from "@material-ui/lab/Alert/Alert";
import MuiSnackbar from "@material-ui/core/Snackbar/Snackbar";

const Snackbar = ({ type }) => {
  const error = "error";
  const success = "success";
  const info = "info";

  let notice;
  let severity = info;

  switch (type) {
    case "regSuccess":
      notice =
        "Поздравляем! Регистрация успешно завершена! Теперь Вы можете заполнить данные о себе.";
      severity = success;
      break;
    case "regFailed":
      notice = "Упс! Что-то пошло не так, повторите попытку.";
      severity = error;
      break;
    case "profileUpdateSuccess":
      notice = "Данные профиля успешно обновлены";
      severity = success;
      break;
    case "profileUpdateFailed":
      notice = "С обновлением данных профиля что-то пошло не так...";
      severity = error;
      break;
    case "auth/requires-recent-login":
      notice =
        "При обновлении e-mail возникли проблемы... Выйдите из своей учетной записи и войдите заново.";
      severity = error;
      break;
    default:
      notice = type;
  }

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  }, [type]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {notice}
      </Alert>
    </MuiSnackbar>
  );
};

Snackbar.propTypes = {
  type: PropTypes.string,
};

export default Snackbar;
