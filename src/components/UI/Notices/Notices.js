import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import * as PropTypes from "prop-types";

import InfoSVG from "../SVG/InfoSVG";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "30px 60px 0",
    fontSize: 14,
    lineHeight: 1,
    "& svg": {
      flexShrink: 0
    }
  },
  typography: {
    fontSize: 14,
    marginLeft: 10
  }
}));

const Notices = ({ type }) => {
  const classes = useStyles();

  const red = "#d32f2f";
  const green = "#388e3c";
  const blue = "#1976d2";

  let notice;
  let color = blue;

  switch (type) {
    case "warning":
      notice =
        "Друзья! Посещение наших магазинов возможно только в медицинской маске или респираторе. Берегите себя и окружающих!";
      color = green;
      break;
    case "accessDenied":
      notice =
        "Данную страницу могут просмотреть только зарегистрированные пользователи. Войдите или зарегистрируйтесь.";
      color = red;
      break;
    case "regSuccess":
      notice =
        "Поздравляем! Регистрация успешно завершена! Теперь Вы можете заполнить данные о себе.";
      color = green;
      break;
    case "regFailed":
      notice = "Упс! Что-то пошло не так, повторите попытку.";
      color = red;
      break;
    case "profileUpdateSuccess":
      notice = "Данные профиля успешно обновлены";
      color = green;
      break;
    case "profileUpdateFailed":
      notice = "С обновлением данных профиля что-то пошло не так...";
      color = green;
      break;

    case "auth/invalid-email":
      notice = "Некорректный e-mail.";
      color = red;
      break;
    case "auth/requires-recent-login":
      notice =
        "При обновлении e-mail возникли проблемы... Выйдите из своей учетной записи и войдите заново.";
      color = red;
      break;
    case "auth/email-already-in-use":
      notice = "Такой e-mail уже используется другим пользователем.";
      color = red;
      break;
    default:
      notice = type;
  }

  return (
    <div className={classes.root}>
      <InfoSVG color={color} />
      <Typography className={classes.typography}>{notice}</Typography>
    </div>
  );
};

Notices.propTypes = {
  type: PropTypes.string,
};

export default Notices;
