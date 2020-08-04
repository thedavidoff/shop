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
