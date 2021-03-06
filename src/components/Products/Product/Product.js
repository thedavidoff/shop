import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Card,
  CardMedia,
  Typography,
  Link, useMediaQuery,
} from "@material-ui/core";
import * as PropTypes from "prop-types";

import { Preview, previewMethods } from "../../UI/Preview/Preview";
import ProductInfo from "./ProductInfo/ProductInfo";
import HitSVG from "../../UI/SVG/HitSVG";
import NewSVG from "../../UI/SVG/NewSVG";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 3000,
    padding: 15,
    textAlign: "left",
    overflow: "visible",
  },
  media: {
    width: "100%",
    marginBottom: 30,
  },
  hit: {
    position: "absolute",
    width: 20,
    height: 20,
    bottom: 0,
    left: 0,
  },
  new: {
    position: "absolute",
    width: 20,
    height: 20,
    bottom: 0,
    left: 25,
  },
  name: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#000",
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.secondary.main,
    },
  },
  photoLink: {
    display: "flex",
    position: "relative",
    height: 233,
    marginBottom: 5,
  },
  description: {
    marginTop: 20,
    fontSize: 14,
  },
  skeleton: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
}));

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
    isHit,
    isNew,
  },
}) => {
  const classes = useStyles();
  const w400 = useMediaQuery("(max-width: 399px)");
  const [isShow, setIsShow] = useState(false);
  const loadSuccess = () => setIsShow(true);

  const [positionStyle, setPositionStyle] = useState();
  const [previewSrc, setPreviewSrc] = useState();
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [coordsPreview, setCoordsPreview] = useState();
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
    <Grid item>
      <Card
        className={classes.card}
        id={id}
        style={positionStyle}
        elevation={15}
      >
        {isShowPreview && (
          <Preview style={coordsPreview} name={name} previewSrc={previewSrc} />
        )}
        <Link
          component={NavLink}
          to={`/video_cards/${id}`}
          className={classes.photoLink}
        >
          <CardMedia
            component="img"
            alt={name}
            image={poster}
            className={classes.media}
            style={isShow ? { display: "block" } : { display: "none" }}
            onMouseOver={showPreview}
            onMouseOut={hidePreview}
            onLoad={loadSuccess}
          />
          {isHit && (
            <span className={classes.hit} data-tip="Хит продаж">
              <HitSVG />
            </span>
          )}
          {isNew && (
            <span className={classes.new} data-tip="Новинка">
              <NewSVG />
            </span>
          )}
        </Link>
        <Link
          component={NavLink}
          to={`/video_cards/${id}`}
          className={classes.name}
        >
          {name}
        </Link>
        <Typography className={classes.description}>{description}</Typography>
        <ProductInfo
          id={id}
          price={price}
          warranty={warranty}
          reviewsCount={reviewsCount}
          sku={sku}
          totalRating={totalRating}
          ratingsCount={ratingsCount}
          status={status}
        />
      </Card>
    </Grid>
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
  isHit: PropTypes.bool,
  isNew: PropTypes.bool,
};

export default Product;
