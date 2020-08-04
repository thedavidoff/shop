import React, { useState } from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";
import PropTypes from "prop-types";

import styles from "./WishListItem.module.css";
import Rating from "../../../UI/Rating/Rating";
import BuyButton from "../../../UI/BuyButton/BuyButton";
import { Preview, previewMethods } from "../../../UI/Preview/Preview";
import NewSVG from "../../../UI/SVG/NewSVG";
import HitSVG from "../../../UI/SVG/HitSVG";
import ViewRest from "../../../UI/ViewRest/ViewRest";

const WishListItem = ({
  productsInCart,
  product: {
    id,
    sku,
    photoInOrder,
    name,
    description,
    preview,
    price,
    warranty,
    status,
    reviewsCount,
    ratingsCount,
    totalRating,
    isHit,
    isNew,
  },
  isSelected,
  handleCheckedItems,
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

  const [previewSrc, setPreviewSrc] = useState(null);
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [coordsPreview, setCoordsPreview] = useState(null);
  const showPreview = (e) => {
    setPreviewSrc(preview);
    setCoordsPreview(previewMethods.showWishListItem(e));
    setIsShowPreview(true);
  };
  const hidePreview = () => {
    setIsShowPreview(false);
  };

  return (
    <tr className={styles.wishListItem}>
      <td>
        <input
          type="checkbox"
          onChange={handleCheckedItems}
          checked={isSelected || ""}
          id={id}
        />
      </td>
      <td>
        <div className={styles.photoBlock}>
          <NavLink to={`/products/video_cards/${id}`}>
            <img
              src={photoInOrder}
              alt={name}
              onMouseOver={showPreview}
              onMouseOut={hidePreview}
            />
          </NavLink>
          {isNew && (
            <span className={styles.new} data-tip="Новинка.">
              <NewSVG />
            </span>
          )}
          {isHit && (
            <span className={styles.hit} data-tip="Хит продаж.">
              <HitSVG />
            </span>
          )}
          {isShowPreview && (
            <Preview
              style={coordsPreview}
              name={name}
              previewSrc={previewSrc}
            />
          )}
        </div>
      </td>
      <td className={styles.descBlock}>
        <NavLink to={`/products/video_cards/${id}`}>
          <b>{name}</b>
        </NavLink>
        <p className={styles.desc}>{description}</p>
        <p>
          <span
            data-tip="Мы даем такой срок гарантии, который можем безоговорочно обеспечить, не вводя клиента в заблуждение и не заманивая нереальными гарантийными сроками."
            className={styles.warranty}
          >{`Гарантия: ${warranty} мес.`}</span>
        </p>
        <p>
          <span
            className={styles.viewRest}
            data-tip="Посмотреть наличие товара на складах."
          >
            <ViewRest id={id} />
          </span>
          <span
            className={styles.notify}
            data-tip="Уведомить об изменении наличия или цены на e-mail."
          >
            Уведомить
          </span>
          <NavLink
            smooth="true"
            to={`/products/video_cards/${id}#reviews`}
            className={styles.reviews}
          >
            {`Отзывы (${reviewsCount})`}
          </NavLink>
        </p>
        <span className={styles.sku}>{`Код товара: ${sku}`}</span>
        <span className={styles.addToCompare}>Добавить к сравнению</span>
      </td>
      <td className={styles.priceBlock}>
        {ratingsCount > 0 && (
          <Rating totalRating={totalRating} ratingsCount={ratingsCount} />
        )}
        <p className={styles.price}>
          <b>{`${price} грн`}</b>
        </p>
        <BuyButton productsInCart={productsInCart} id={id} />
        <div className={styles.status} data-tip={tooltipText}>
          {status}
        </div>
      </td>
    </tr>
  );
};

WishListItem.propTypes = {
  productsInCart: PropTypes.array,
  id: PropTypes.number,
  sku: PropTypes.number,
  photoInOrder: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  preview: PropTypes.string,
  price: PropTypes.number,
  warranty: PropTypes.number,
  status: PropTypes.string,
  reviewsCount: PropTypes.number,
  ratingsCount: PropTypes.number,
  totalRating: PropTypes.number,
  isHit: PropTypes.bool,
  isNew: PropTypes.bool,
  isSelected: PropTypes.bool,
  handleCheckedItems: PropTypes.func,
};

export default WishListItem;
