import React, { useState } from "react";
import * as PropTypes from "prop-types";

import Preloader from "../Preloader/Preloader";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: 532,
    height: 432,
    padding: 15,
    border: "1px solid #ccc",
    zIndex: 1000
  },
}));

export const Preview = ({ previewSrc, name, style }) => {
  const classes = useStyles();

  const [isShow, setIsShow] = useState(false);
  const loadSuccess = () => setIsShow(true);

  return (
    <Paper elevation={15} className={classes.root} style={style}>
      {!isShow && <Preloader />}
      <img
        src={previewSrc}
        alt={name}
        onLoad={loadSuccess}
        style={isShow ? { display: "block" } : { display: "none" }}
      />
    </Paper>
  );
};

Preview.propTypes = {
  previewSrc: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
};

export const previewMethods = {
  showProduct(e) {
    const height = window.document.documentElement.clientHeight;
    const top = e.target.getBoundingClientRect().top;
    const x = e.target.getBoundingClientRect().x;

    if (e.target) {
      if (x < 532) {
        if (top + 432 > height) {
          return { top: -(top + 432 - height + 15) + "px", left: 320 }; // 432 - height of preview block
        } else {
          return { top: 0, left: 320 };
        }
      } else {
        if (top + 432 > height) {
          return { top: -(top + 432 - height + 15) + "px", right: 320 };
        } else {
          return { top: 0, right: 320 };
        }
      }
    }
  },
  showWishListItem(e) {
    const height = window.document.documentElement.clientHeight;
    const top = e.target.getBoundingClientRect().top;

    if (e.target) {
      if (top + 432 > height) {
        return { top: -(top + 432 - height + 30) + "px", left: 130 };
      } else {
        return { top: 0, left: 130 };
      }
    }
  },
};
