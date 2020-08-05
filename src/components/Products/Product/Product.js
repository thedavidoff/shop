import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./Product.module.css";
import { Preview, previewMethods } from "../../UI/Preview/Preview";
import ProductInfo from "./ProductInfo/ProductInfo";
import HitSVG from "../../UI/SVG/HitSVG";
import NewSVG from "../../UI/SVG/NewSVG";
import Preloader from "../../UI/Preloader/Preloader";

const Product = ({
  id,
  product: {
    sku,
    name,
    description,
    poster,
    preview,
    price,
    warranty,
    status,
    reviewsCount,
    ratingsCount,
    totalRating,
    isNew,
    isHit,
  },
}) => {
  const [isShow, setIsShow] = useState(false);
  const loadSuccess = () => setIsShow(true);

  const [positionStyle, setPositionStyle] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [coordsPreview, setCoordsPreview] = useState(null);
  const showPreview = (e) => {
    setPositionStyle({ position: "relative" });
    setPreviewSrc(preview);
    setCoordsPreview(previewMethods.showProduct(e));
    setIsShowPreview(true);
  };
  const hidePreview = () => {
    setPositionStyle(null);
    setIsShowPreview(false);
  };

  return (
    <div className={styles.productCard} id={id} style={positionStyle}>
      {isShowPreview && (
        <Preview style={coordsPreview} name={name} previewSrc={previewSrc} />
      )}
      <NavLink
        to={`/shop/video_cards/${id}`}
        className={styles.productPhotoLink}
      >
        {!isShow && <Preloader />}
        <img
          src={poster}
          alt={name}
          className={styles.productPhoto}
          style={isShow ? { display: "block" } : { display: "none" }}
          onMouseOver={showPreview}
          onMouseOut={hidePreview}
          onLoad={loadSuccess}
        />
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
      </NavLink>
      <NavLink
        to={`/shop/video_cards/${id}`}
        className={styles.productName}
      >
        <b>{name}</b>
      </NavLink>
      <div className={styles.productDesc}>{description}</div>
      <ProductInfo
        price={price}
        warranty={warranty}
        reviewsCount={reviewsCount}
        sku={sku}
        totalRating={totalRating}
        ratingsCount={ratingsCount}
        id={id}
        status={status}
      />
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.number,
  sku: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  poster: PropTypes.string,
  preview: PropTypes.string,
  price: PropTypes.number,
  warranty: PropTypes.number,
  status: PropTypes.string,
  reviewsCount: PropTypes.number,
  ratingsCount: PropTypes.number,
  totalRating: PropTypes.number,
  isNew: PropTypes.bool,
  isHit: PropTypes.bool,
};

export default Product;
