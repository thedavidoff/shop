import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import {
  makeStyles,
  Button,
  Typography,
  Popper,
  ClickAwayListener,
  Paper,
  Fade,
} from "@material-ui/core";
import * as PropTypes from "prop-types";

import LoginForm from "../Forms/LoginForm/LoginForm";
import RegForm from "../Forms/RegForm/RegForm";
import { login, logout, registration } from "../../redux/authReducer";
import { getIsAnonymous, getIsAuth, getUserName } from "../../redux/selectors";
import DarkTooltip from "../UI/Tooltip/DarkTooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexBasis: 290,
    paddingBottom: 15,
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    textTransform: "none",
    padding: "0 10px",
    fontSize: 14,
    "&:hover": { backgroundColor: theme.palette.primary.dark },
  },
  displayName: {
    marginTop: 2,
    padding: "0 5px",
    fontSize: 13,
  },
}));

const Login = ({
  isAuth,
  isAnonymous,
  userName,
  login,
  logout,
  registration,
}) => {
  const classes = useStyles();

  const [loginAnchor, setLoginAnchor] = React.useState(null);
  const [regAnchor, setRegAnchor] = React.useState(null);

  const handleLogout = () => {
    logout();
    setLoginAnchor(null);
  };
  const handleOpenLoginForm = (event) => {
    setLoginAnchor(loginAnchor ? null : event.currentTarget);
  };
  const handleOpenRegForm = (event) => {
    setRegAnchor(regAnchor ? null : event.currentTarget);
  };
  const handleClickAwayLoginForm = () => {
    setLoginAnchor(null);
  };
  const handleClickAwayRegForm = () => {
    setRegAnchor(null);
  };

  return (
    <div className={classes.root}>
      {isLoaded(isAuth) && !isEmpty(isAuth) && !isAnonymous ? (
        <>
          <Button
            size="small"
            variant="contained"
            className={classes.button}
            onClick={handleLogout}
          >
            Выйти
          </Button>
          <DarkTooltip title={userName} placement="bottom">
            <Typography className={classes.displayName}>
              {userName && userName.length > 19
                ? userName.slice(0, 15) + "..."
                : userName}
            </Typography>
          </DarkTooltip>
          <Button
            size="small"
            variant="contained"
            component={Link}
            to="/profile?tab=regdata"
            className={classes.button}
          >
            Профиль
          </Button>
        </>
      ) : (
        <>
          <Button
            id="loginForm"
            size="small"
            aria-describedby="loginForm"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleOpenLoginForm}
          >
            Войти
          </Button>
          <Popper
            open={!!loginAnchor}
            anchorEl={loginAnchor}
            placement="bottom-start"
            transition
          >
            {({ TransitionProps }) => (
              <ClickAwayListener onClickAway={handleClickAwayLoginForm}>
                <Fade {...TransitionProps} timeout={350}>
                  <Paper elevation={15}>
                    <LoginForm onSubmit={login} />
                  </Paper>
                </Fade>
              </ClickAwayListener>
            )}
          </Popper>
          <Button
            id="regForm"
            size="small"
            aria-describedby="regForm"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleOpenRegForm}
          >
            Зарегистрироваться
          </Button>
          <Popper
            open={!!regAnchor}
            anchorEl={regAnchor}
            placement="bottom-end"
            transition
          >
            {({ TransitionProps }) => (
              <ClickAwayListener onClickAway={handleClickAwayRegForm}>
                <Fade {...TransitionProps} timeout={350}>
                  <Paper elevation={15}>
                    <RegForm onSubmit={registration} />
                  </Paper>
                </Fade>
              </ClickAwayListener>
            )}
          </Popper>
        </>
      )}
    </div>
  );
};

Login.propTypes = {
  isAuth: PropTypes.object,
  isAnonymous: PropTypes.bool,
  userName: PropTypes.string,
  login: PropTypes.func,
  logout: PropTypes.func,
  registration: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isAuth: getIsAuth(state),
    isAnonymous: getIsAnonymous(state),
    userName: getUserName(state),
  };
};

export default connect(mapStateToProps, {
  login,
  logout,
  registration,
})(Login);
