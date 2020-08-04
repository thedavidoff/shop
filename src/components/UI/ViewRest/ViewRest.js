import React, { useState } from "react";
import { connect } from "react-redux";

import styles from "./ViewRest.module.css";
import PhoneSVG from "../SVG/PhoneSVG";
import VodafoneSVG from "../SVG/VodafoneSVG";
import KyivstarSVG from "../SVG/KyivstarSVG";
import LifecellSVG from "../SVG/LifecellSVG";

const ViewRest = ({ id, products }) => {
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const product = products.find((product) => product.id === id);

  return (
    <>
      {isOpen && (
        <>
          <div
            style={{ height: scrollHeight + "px" }}
            className={styles.overlay}
            onClick={handleClick}
          />
          <style>{".__react_component_tooltip.show{display:none;}"}</style>
          <div className={styles.viewRestWindow}>
            <div className={styles.close} onClick={handleClick} />
            <h3>{`Наличие товара ${product.name} по складам:`}</h3>
            <table>
              <tbody>
                <tr style={{background: product.inventory[0] > 0 ? "#97ff94" : "#ff9e9e"}}>
                  <td>г. Харьков, ул. Алчевских, 36</td>
                  <td>{product.inventory[0] > 0 ? "есть" : "под заказ"}</td>
                </tr>
                <tr style={{background: product.inventory[1] > 0 ? "#97ff94" : "#ff9e9e"}}>
                  <td>г. Харьков, пр. Независимости, 5</td>
                  <td>{product.inventory[1] > 0 ? "есть" : "под заказ"}</td>
                </tr>
                <tr style={{background: product.inventory[2] > 0 ? "#97ff94" : "#ff9e9e"}}>
                  <td>г. Харьков, ул. Короленко, 6</td>
                  <td>{product.inventory[2] > 0 ? "есть" : "под заказ"}</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.contacts}>
              <h4>Контактные данные:</h4>
              <a className={styles.phone} href="tel:057 728-30-08">
                <PhoneSVG />
                (057) 728-30-08
              </a>
              <a className={styles.phone} href="tel:095 00-00-428">
                <VodafoneSVG />
                095 00-00-428
              </a>
              <a className={styles.phone} href="tel:067 00-00-428">
                <KyivstarSVG />
                067 00-00-428
              </a>
              <a className={styles.phone} href="tel:093 00-00-428">
                <LifecellSVG />
                093 00-00-428
              </a>
            </div>
          </div>
        </>
      )}
      <span onClick={handleClick}>Посмотреть наличие</span>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.homePage.products,
  };
};

export default connect(mapStateToProps, null)(ViewRest);
