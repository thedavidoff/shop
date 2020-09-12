import React from "react";
import * as PropTypes from "prop-types";

import styles from "./Cart.module.css";

const Cart = ({ countOfProductsInCart, totalCost }) => {
  let totalCostStyle;
  if (totalCost > 100000) totalCostStyle = { fontSize: "14px" };

  return (
    <div className={styles.cart}>
      {countOfProductsInCart > 0 ? (
        <>
          <p className={styles.cartText}>
            <b>В вашей корзине:</b>
          </p>
          <p className={styles.cartContent}>
            <span className={styles.cartCounter}>{countOfProductsInCart}</span>
            <span>
              {countOfProductsInCart === 0 && " товаров"}
              {countOfProductsInCart === 1 && " товар"}
              {countOfProductsInCart > 1 &&
                countOfProductsInCart < 5 &&
                " товара"}
              {countOfProductsInCart > 4 && " товаров"}
            </span>
          </p>
          <p className={styles.totalCost} style={totalCostStyle}>
            <b>{`Общая стоимость: ${totalCost} грн`}</b>
          </p>
        </>
      ) : (
        <p className={styles.emptyCart}>
          <b>Ваша корзина пуста</b>
        </p>
      )}
    </div>
  );
};

Cart.propTypes = {
  countOfProductsInCart: PropTypes.number,
  totalCost: PropTypes.number,
};

export default Cart;
