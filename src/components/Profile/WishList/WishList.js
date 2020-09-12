import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import * as PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from "./WishList.module.css";
import stylesTooltip from "../../UI/Tooltip/Tooltip.module.css";
import {
  getProducts,
  getProductsInCart,
  getWishList,
} from "../../../redux/selectors";
import WishListItem from "./WishListItem/WishListItem";
import { addToCart } from "../../../redux/cartReducer";
import { removeFromWishList } from "../../../redux/authReducer";

const WishList = ({
  products,
  productsInCart,
  wishList,
  addToCart,
  removeFromWishList,
}) => {
  const [isSelected, setIsSelected] = useState();

  useEffect(() => {
    setIsSelected(
      Object.fromEntries(
        Object.entries(wishList).map(([, id]) => {
          let key = id;
          let value = false;
          return [key, value];
        })
      )
    );
  }, [wishList]);

  const toggleSelectedAll = () => {
    setIsSelected(
      Object.fromEntries(
        Object.entries(isSelected).map(([id, value]) => {
          Object.values(isSelected).includes(false)
            ? (value = true)
            : (value = false);
          return [id, value];
        })
      )
    );
  };

  const handleSelectedItems = (e) => {
    const id = +e.target.id;
    if (e.target.checked && !isSelected[id])
      setIsSelected({ ...isSelected, [id]: true });
    if (!e.target.checked && isSelected[id]) {
      setIsSelected({ ...isSelected, [id]: false });
    }
  };

  let selectedItems;
  if (isSelected)
    selectedItems = Object.keys(isSelected).filter(
      (id) => isSelected[id] === true
    );

  const removeSelectedItems = () => {
    removeFromWishList(selectedItems);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Список желаний | Профиль</title>
        <link
          rel="canonical"
          href="http://localhost:3000/profile?tab=wishlist"
        />
      </Helmet>
      <div className={styles.wishList}>
        <h5>Мой список желаний:</h5>
        <ReactTooltip className={stylesTooltip.tooltip} />
        {wishList && wishList.length !== 0 && (
          <>
            <div className={styles.selectActions}>
              <p>Выберите действия с отмеченными товарами:</p>
              <span onClick={toggleSelectedAll}>Выбрать все</span>
              <span onClick={() => addToCart(selectedItems)}>
                Добавить в корзину
              </span>
              <span onClick={removeSelectedItems}>Удалить из списка</span>
            </div>
            <table className={styles.wishListTable}>
              <tbody>
                {wishList.map((id) => {
                  return (
                    <WishListItem
                      key={id}
                      products={productsInCart}
                      product={products.find((product) => product.id === id)}
                      handleCheckedItems={handleSelectedItems}
                      isSelected={isSelected && isSelected[id]}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className={styles.totalCost}>
              Общая сумма:{" "}
              <span>
                <b>{`${wishList
                  .map(
                    (id) => products.find((product) => product.id === id).price
                  )
                  .reduce((sum, price) => sum + price, 0)} грн`}</b>
              </span>
            </div>
          </>
        )}
        {wishList.length === 0 && (
          <div className={styles.emptyWishList}>
            <p>Этот список пуст</p>
            <p>
              Чтобы добавить сюда товары, нажимайте ссылки "В список желаний" на
              страницах сайта.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

WishList.propTypes = {
  products: PropTypes.array,
  productsInCart: PropTypes.object,
  wishList: PropTypes.array,
  addToCart: PropTypes.func,
  removeFromWishList: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    products: getProducts(state),
    productsInCart: getProductsInCart(state),
    wishList: getWishList(state),
  };
};

export default connect(mapStateToProps, { addToCart, removeFromWishList })(
  WishList
);
