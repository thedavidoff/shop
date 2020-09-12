import React from "react";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from "./Order.module.css";
import OrderItem from "./ProductInOrder/OrderItem";
import { changeQuantity, deleteCartItem } from "../../../../redux/cartReducer";
import {
  getProducts,
  getProductsInCart,
  getTotalCost,
} from "../../../../redux/selectors";
import AddToWishListButton from "../../../UI/AddToWishListButton/AddToWishListButton";

const Order = (props) => {
  const productIds = [];
  props.productsInCart && Object.values(props.productsInCart).map(({id}) => productIds.push(id));

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Корзина / Оформление заказа</title>
        <link rel="canonical" href="http://localhost:3000/order" />
      </Helmet>
      <div className={styles.order}>
        <h1>Ваша корзина</h1>
        {props.productsInCart &&
        Object.values(props.productsInCart).length !== 0 ? (
          <>
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <td />
                  <td />
                  <td>Кол-во</td>
                  <td>Цена</td>
                  <td>Сумма</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {Object.values(props.productsInCart).map(({ id, quantity }) => {
                  return (
                    <OrderItem
                      key={id}
                      id={id}
                      product={props.products.find(
                        (product) => product.id === id
                      )}
                      quantity={quantity}
                      changeQuantity={props.changeQuantity}
                      deleteCartItem={props.deleteCartItem}
                    />
                  );
                })}
                <tr className={styles.productTableFooter}>
                  <td />
                  <td />
                  <td className={styles.summary}>
                    <b>К оплате:</b>
                  </td>
                  <td colSpan="3">
                    <b>{`${props.totalCost} грн.`}</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={styles.bigAddToWishListButton}>
              <AddToWishListButton id={productIds} />
            </div>
          </>
        ) : (
          <div className={styles.emptyCart}>Ваша корзина пуста</div>
        )}
      </div>
    </>
  );
};

Order.propTypes = {
  products: PropTypes.array,
  productsInCart: PropTypes.object,
  changeQuantity: PropTypes.func,
  deleteCartItem: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    products: getProducts(state),
    productsInCart: getProductsInCart(state),
    totalCost: getTotalCost(state),
  };
};

export default connect(mapStateToProps, { changeQuantity, deleteCartItem })(
  Order
);
