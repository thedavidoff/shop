import React from "react";

import styles from "./Notices.module.css";
import InfoSVG from "../SVG/InfoSVG";
import PropTypes from "prop-types";

const Notices = ({ type }) => {
  const red = "red";
  const green = "green";
  const blue = "#2196f3";

  let notice;
  let color = blue;

  switch (type) {
    case "warning":
      notice =
        "Друзья! Посещение наших магазинов возможно только в медицинской маске или респираторе. Берегите себя и окружающих!";
      color = blue;
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
    <div className={styles.notices}>
      <InfoSVG color={color} />
      {notice}
    </div>
  );
};

Notices.propTypes = {
  type: PropTypes.string,
};

export default Notices;
