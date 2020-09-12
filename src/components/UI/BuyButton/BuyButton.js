import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";

import styles from "./BuyButton.module.css";
import { getProductsInCart } from "../../../redux/selectors";
import { addToCart } from "../../../redux/cartReducer";

const BuyButton = ({ productsInCart, id, addToCart }) => {
  let product;
  if (productsInCart) product = Object.values(productsInCart).find(product => product.id === id);

  return (
    <div className={styles.BuyButtonWrap} style={{ position: "relative" }}>
      <button onClick={() => addToCart(id)} className={styles.BuyButton}>
        Добавить в корзину
      </button>
      {product ? (
        <>
          <div
            className={styles.countOfProducts}
            style={{ position: "absolute", top: "36px" }}
          >
            {product.quantity === 1 && (
              <span>
                Товар добавлен в <NavLink to="/order">корзину</NavLink>
              </span>
            )}
            {product.quantity > 1 && (
              <span>
                Уже в <NavLink to="/order">корзине</NavLink>
                <br />
                {` ${product.quantity} шт.`}
              </span>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

BuyButton.propTypes = {
  productsInCart: PropTypes.object,
  id: PropTypes.number,
  addToCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    productsInCart: getProductsInCart(state),
  };
};

export default connect(mapStateToProps, { addToCart })(BuyButton);
