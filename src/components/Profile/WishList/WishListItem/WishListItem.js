import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {
  makeStyles,
  TableRow,
  TableCell,
  Link,
  Typography,
  Box,
} from "@material-ui/core";
import * as PropTypes from "prop-types";

import { PrimaryColorCheckbox } from "../../../UI/Checkbox/Checkbox";
import { Preview, previewMethods } from "../../../UI/Preview/Preview";
import ViewRest from "../../../UI/ViewRest/ViewRest";
import Rating from "../../../UI/Rating/Rating";
import BuyButton from "../../../UI/BuyButton/BuyButton";
import DarkTooltip from "../../../UI/Tooltip/DarkTooltip";
import HitSVG from "../../../UI/SVG/HitSVG";
import NewSVG from "../../../UI/SVG/NewSVG";
import ForwardLink from "../../../UI/ForwardLink/ForwardLink";

const useStyles = makeStyles((theme) => ({
  root: {
    "& td": {
      borderBottom: "1px solid #bfbfbf",
    },
  },
  checkbox: {
    "&>span": {
      paddingLeft: 9,
    },
  },
  photoLink: {
    position: "relative",
    display: "block",
  },
  new: {
    position: "absolute",
    width: 20,
    height: 20,
    bottom: -10,
    left: 25,
  },
  hit: {
    position: "absolute",
    width: 20,
    height: 20,
    bottom: -10,
    left: 0,
  },
  descBlock: {
    "&>a": {
      fontSize: 14,
      color: "#000",
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
  },
  box: {
    margin: "5px 0",
    "& span": {
      marginRight: 10,
    },
  },
  desc: {
    margin: "10px 0",
    fontSize: 14,
  },
  warranty: {
    fontSize: 14,
    lineHeight: 1,
    cursor: "default",
  },
  reviews: {
    color: "#000",
    textDecoration: "underline",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  sku: {
    fontSize: 14,
    lineHeight: 1,
    color: "darkgray",
  },
  addToCompare: {
    fontSize: 14,
    lineHeight: 1,
    borderBottom: "1px dashed",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  priceBlock: {
    textAlign: "center",
  },
  price: {
    margin: "0 0 10px",
  },
  status: {
    fontSize: 12,
    lineHeight: 1.3,
  },
}));

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
  const classes = useStyles();

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

  const handleClick = () => {
    ReactTooltip.hide();
  };

  return (
    <TableRow key={id} className={classes.root}>
      <TableCell align="center" className={classes.checkbox}>
        <PrimaryColorCheckbox
          size="small"
          color="primary"
          id={id + ""}
          checked={!!isSelected}
          onChange={handleCheckedItems}
        />
      </TableCell>
      <TableCell>
        <Link
          component={NavLink}
          to={`/shop/video_cards/${id}`}
          className={classes.photoLink}
        >
          <img
            src={photoInOrder}
            alt={name}
            onMouseOver={showPreview}
            onMouseOut={hidePreview}
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
          {isShowPreview && (
            <Preview
              style={coordsPreview}
              name={name}
              previewSrc={previewSrc}
            />
          )}
        </Link>
      </TableCell>
      <TableCell className={classes.descBlock}>
        <Link component={NavLink} to={`/shop/video_cards/${id}`}>
          <b>{name}</b>
        </Link>
        <Typography className={classes.desc}>{description}</Typography>
        <Box className={classes.box}>
          <Typography
            component="span"
            data-tip="Мы даем такой срок гарантии, который можем безоговорочно обеспечить, не вводя клиента в заблуждение и не заманивая нереальными гарантийными сроками."
            className={classes.warranty}
          >{`Гарантия: ${warranty} мес.`}</Typography>
        </Box>
        <Box className={classes.box} onClick={handleClick}>
          <ViewRest id={id} />
          <Link
            component={ForwardLink}
            smooth
            to={`/shop/video_cards/${id}#reviews`}
            className={classes.reviews}
          >{`Отзывы (${reviewsCount})`}</Link>
        </Box>
        <Box className={classes.box}>
          <Typography
            component="span"
            className={classes.sku}
          >{`Код товара: ${sku}`}</Typography>
          <Typography component="span" className={classes.addToCompare}>
            Добавить к сравнению
          </Typography>
        </Box>
      </TableCell>
      <TableCell className={classes.priceBlock}>
        {ratingsCount > 0 && (
          <Rating totalRating={totalRating} ratingsCount={ratingsCount} />
        )}
        <Typography className={classes.price}>
          <b>{`${price} грн`}</b>
        </Typography>
        <BuyButton productsInCart={productsInCart} id={id} />
        <DarkTooltip title={tooltipText} placement="left">
          <Typography className={classes.status}>{status}</Typography>
        </DarkTooltip>
      </TableCell>
    </TableRow>
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
