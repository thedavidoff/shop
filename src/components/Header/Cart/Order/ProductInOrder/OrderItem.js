import React from "react";

import styles from "../Order.module.css";
import { NavLink } from "react-router-dom";
import AddToWishListButton from "../../../../UI/AddToWishListButton/AddToWishListButton";
import * as PropTypes from "prop-types";

const OrderItem = ({
  id,
  quantity,
  changeQuantity,
  deleteCartItem,
  product: { photoInOrder, name, price },
}) => {
  const handleChange = (e) => changeQuantity(e.target.value, id);

  return (
    <tr id={id} className={styles.orderProduct}>
      <td className={styles.orderProductPhoto}>
        <NavLink to={`/shop/video_cards/${id}`}>
          <img src={photoInOrder} alt={name} />
        </NavLink>
      </td>
      <td className={styles.orderProductName}>
        <NavLink to={`/shop/video_cards/${id}`}>
          <b>{name}</b>
        </NavLink>
        <div className={styles.addToWishListButtonWrapper}>
          <AddToWishListButton id={id} />
        </div>
      </td>
      <td className={styles.orderProductQuantity}>
        <input
          type="number"
          min="1"
          defaultValue={quantity}
          onChange={handleChange}
        />
      </td>
      <td className={styles.orderProductPrice}>
        <b>{`${price} грн`}</b>
      </td>
      <td className={styles.orderProductTotalCost}>
        <b>{`${quantity * price} грн`}</b>
      </td>
      <td className={styles.orderDeleteProduct}>
        <button
          onClick={() => deleteCartItem(id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

OrderItem.propTypes = {
  id: PropTypes.number,
  quantity: PropTypes.number,
  changeQuantity: PropTypes.func,
  deleteCartItem: PropTypes.func,
  photoInOrder: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number
};

export default OrderItem;
