import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import * as PropTypes from "prop-types";

import InfoSVG from "../SVG/InfoSVG";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "15px 30px 0",
    fontSize: 14,
    lineHeight: 1,
    "& svg": {
      flexShrink: 0,
    },
  },
  typography: {
    fontSize: 14,
    marginLeft: 10,
  },
}));

const Notice = ({ type }) => {
  const classes = useStyles();

  const red = "#d32f2f";
  //const green = "#4caf50";
  const blue = "#1976d2";

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

Notice.propTypes = {
  type: PropTypes.string,
};

export default Notice;
