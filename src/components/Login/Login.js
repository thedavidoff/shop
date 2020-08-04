import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import ReactTooltip from "react-tooltip";
import PropTypes from "prop-types";

import styles from "./Login.module.css";
import stylesTooltip from "../UI/Tooltip/Tooltip.module.css";
import RegistrationForm from "../Forms/RegistrationForm/RegistrationForm";
import LoginForm from "../Forms/LoginForm/LoginForm";
import { login, logout, registration } from "../../redux/authReducer";
import Preloader from "../UI/Preloader/Preloader";

const Login = ({
  isAuth,
  userName,
  authErrorMessage,
  regFailedMessage,
  login,
  logout,
  registration,
}) => {
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false);
  const [isOpenRegistrationForm, setIsOpenRegistrationForm] = useState(false);

  const toggleIsOpenLoginForm = () => {
    setIsOpenLoginForm(true);
    setIsOpenRegistrationForm(false);
    isOpenLoginForm && setIsOpenLoginForm(false);
  };

  const toggleIsOpenRegistrationForm = () => {
    setIsOpenRegistrationForm(true);
    setIsOpenLoginForm(false);
    isOpenRegistrationForm && setIsOpenRegistrationForm(false);
  };

  return (
    <div className={styles.loginBlock}>
      {isLoaded(isAuth) && !isEmpty(isAuth) && userName ? (
        <>
          <ReactTooltip className={stylesTooltip.tooltip} />
          <button className={styles.loginBlockButton} onClick={logout}>
            Выйти
          </button>
          <div className={styles.displayName} data-tip={userName}>
            {userName && userName.length > 13
              ? userName.slice(0, 13) + "..."
              : userName}
          </div>
          <NavLink
            className={styles.loginBlockProfileLink}
            to="/profile?tab=regdata"
          >
            Профиль
          </NavLink>
        </>
      ) : isLoaded(isAuth) && isEmpty(isAuth) ? (
        <>
          <button
            className={styles.loginBlockButton}
            onClick={toggleIsOpenLoginForm}
          >
            Войти
          </button>
          {isOpenLoginForm && (
            <LoginForm onSubmit={login} authErrorMessage={authErrorMessage} />
          )}
          <button
            className={styles.loginBlockButton}
            onClick={toggleIsOpenRegistrationForm}
          >
            Зарегистрироваться
          </button>
          {isOpenRegistrationForm && (
            <RegistrationForm
              onSubmit={registration}
              regFailedMessage={regFailedMessage}
            />
          )}
        </>
      ) : (
        <Preloader type="login" />
      )}
    </div>
  );
};

Login.propTypes = {
  isAuth: PropTypes.object,
  userName: PropTypes.string,
  authErrorMessage: PropTypes.string,
  regFailedMessage: PropTypes.string,
  login: PropTypes.func,
  logout: PropTypes.func,
  registration: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.firebase.auth,
    authErrorMessage: state.auth.authErrorMessage,
    regFailedMessage: state.auth.regFailedMessage,
    userName: state.firebase.auth.displayName,
    isShowRegistrationSuccessMessage:
      state.auth.isShowRegistrationSuccessMessage,
  };
};

export default connect(mapStateToProps, {
  login,
  logout,
  registration,
})(Login);
