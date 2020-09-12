import React, { useState } from "react";
import * as PropTypes from "prop-types";

import styles from "./Preview.module.css";
import Preloader from "../Preloader/Preloader";

export const Preview = ({ previewSrc, name, style }) => {
  const [isShow, setIsShow] = useState(false);
  const loadSuccess = () => setIsShow(true);

  return (
    <div className={styles.preview} style={style}>
      {!isShow && <Preloader />}
      <img
        src={previewSrc}
        alt={name}
        onLoad={loadSuccess}
        style={isShow ? { display: "block" } : { display: "none" }}
      />
    </div>
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

    if (e.currentTarget) {
      if (e.currentTarget.x < 532) {
        if (top + 432 > height) {
          return { top: -(top + 432 - height + 15) + "px", left: "315px" };
        } else {
          return { top: 0, left: "315px" };
        }
      } else {
        if (top + 432 > height) {
          return { top: -(top + 432 - height + 15) + "px", right: "315px" };
        } else {
          return { top: 0, right: "315px" };
        }
      }
    }
  },
  showWishListItem(e) {
    const height = window.document.documentElement.clientHeight;
    const top = e.target.getBoundingClientRect().top;

    if (e.currentTarget) {
      if (top + 432 > height) {
        return { top: -(top + 432 - height + 30) + "px", left: "130px" };
      } else {
        return { top: 0, left: "130px" };
      }
    }
  },
};
