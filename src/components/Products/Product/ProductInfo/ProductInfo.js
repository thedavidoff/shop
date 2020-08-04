import React from "react";
import ReactTooltip from "react-tooltip";
import { HashLink as Link } from "react-router-hash-link";
import PropTypes from "prop-types";

import styles from "./ProductInfo.module.css";
import stylesTooltip from "./../../../UI/Tooltip/Tooltip.module.css";
import Rating from "../../../UI/Rating/Rating";
import BuyButton from "../../../UI/BuyButton/BuyButton";
import AddToWishListButton from "../../../UI/AddToWishListButton/AddToWishListButton";
import ViewRest from "../../../UI/ViewRest/ViewRest";

const ProductInfo = ({
  price,
  warranty,
  reviewsCount,
  sku,
  totalRating,
  ratingsCount,
  id,
  status,
}) => {
  let tooltipText;
  switch (status) {
    case "есть в наличии":
      tooltipText = "Товар в наличии на нашем складе";
      break;
    case "доступно под заказ (1-5 дней)":
      tooltipText =
        "Товар есть у наших поставщиков. Стандартные сроки поставки от 1 до 5 дней";
      break;
    case "ожидается поставка":
      tooltipText = "Товар в ближайшее время будет доступен к заказу";
      break;
    case "нет в наличии":
      tooltipText =
        "Товар отсутствует у поставщиков. Возможно, товар больше не появится в продаже";
      break;
    default:
      tooltipText = status;
  }

  const handleClick = () => {
    ReactTooltip.hide()
  };

  return (
    <div className={styles.productInfo}>
      <ReactTooltip className={stylesTooltip.tooltip} />

      <div
        className={`${styles.productInfoColumn} ${styles.productInfoLeftColumn}`}
      >
        <div className={styles.productPrice}>
          <b>{`${price} грн`}</b>
        </div>
        <ul>
          <li
            className={styles.warranty}
            data-tip="Мы даем такой срок гарантии, который можем безоговорочно обеспечить, не вводя клиента в заблуждение и не заманивая нереальными гарантийными сроками."
          >{`Гарантия: ${warranty} мес.`}</li>
          <li
            className={styles.viewRest}
            data-tip="Посмотреть наличие товара на складах."
            onClick={handleClick}
          >
            <ViewRest id={id} />
          </li>
          <li
            className={styles.notify}
            data-tip="Уведомить об изменении наличия или цены на e-mail."
          >
            Уведомить
          </li>
          <li className={styles.reviews}>
            <Link
              smooth="true"
              to={`/products/video_cards/${id}#reviews`}
            >{`Отзывы (${reviewsCount})`}</Link>
          </li>
          <li className={styles.addToWishList}>
            <AddToWishListButton id={id} />
          </li>
          <li className={styles.sku}>{`Код товара: ${sku}`}</li>
          <li className={styles.addToCompare}>
            <span>Добавить к сравнению</span>
          </li>
        </ul>
      </div>
      <div
        className={`${styles.productInfoColumn} ${styles.productInfoRightColumn}`}
      >
        {totalRating > 0 && (
          <Rating totalRating={totalRating} ratingsCount={ratingsCount} />
        )}
        <BuyButton id={id} />
        <div className={styles.status} data-tip={tooltipText}>
          {status}
        </div>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  price: PropTypes.number,
  warranty: PropTypes.number,
  reviewsCount: PropTypes.number,
  sku: PropTypes.number,
  totalRating: PropTypes.number,
  ratingsCount: PropTypes.number,
  id: PropTypes.number,
  status: PropTypes.string,
};

export default ProductInfo;
