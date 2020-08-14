import React from "react";
import PropTypes from "prop-types";

import styles from "./Preloader.module.css";

const Preloader = ({ type }) => {
  const cadetblue = "#5f9ea0";
  const lightBlue = "#adc8c9";
  const lightOrange = "#f7b485";

  let s;
  let color;

  switch (type) {
    case "products":
    case "reviews":
    case "productPage":
      s = { width: "50px", height: "50px" };
      color = cadetblue;
      break;
    case "inputProfile":
      s = { width: "20px", height: "20px", marginTop: "1px" };
      color = cadetblue;
      break;
    case "login":
      s = { position: "relative", height: "40px", bottom: "8px" };
      color = lightOrange;
      break;
    case "bigProfile":
      s = { position: "relative", height: "40px", top: "15px", left: "15px" };
      color = cadetblue;
      break;
    case "productInfo":
      s = { width: "20px", height: "20px" };
      color = cadetblue;
      break;
    case "filter":
      s = { position: "relative", width: "50px", height: "50px", left: "calc(50% - 25px)" };
      color = lightBlue;
      break;
    default:
      s = {};
      color = cadetblue;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.preloader}
      style={s}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        r="32"
        strokeWidth="8"
        stroke={color}
        strokeDasharray="50.26548245743669 50.26548245743669"
        fill="none"
        strokeLinecap="round"
        transform="rotate(279.371 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        />
      </circle>
    </svg>
  );
};

Preloader.propTypes = {
  type: PropTypes.string,
};

export default Preloader;
