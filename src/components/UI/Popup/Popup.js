import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./Popup.module.css";
import { getProducts } from "../../../redux/selectors";

const Popup = ({ text, isClose, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  let windowWidth = document.documentElement.clientWidth;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    isClose && setIsOpen(false);
  }, [isClose]);

  return (
    <>
      {isOpen && (
        <>
          <div className={styles.overlay} onClick={handleClick} />
          <style>{`.__react_component_tooltip.show{display:none;}.${styles.popupWindow},.${styles.overlay}{cursor:initial;}`}</style>
          <div
            className={styles.popupWindow}
            style={{ marginLeft: windowWidth / 2 - 300 + "px" }}
          >
            <div className={styles.close} onClick={handleClick} />
            {children}
          </div>
        </>
      )}
      <span className={styles.popupWindowTitle} onClick={handleClick}>
        {text}
      </span>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: getProducts(state),
  };
};

export default connect(mapStateToProps, null)(Popup);
