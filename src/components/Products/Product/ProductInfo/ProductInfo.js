import React from "react";
import ReactTooltip from "react-tooltip";
import {
  makeStyles,
  Grid,
  List,
  ListItem,
  Link,
  Typography,
} from "@material-ui/core";
import * as PropTypes from "prop-types";

import stylesTooltip from "./../../../UI/Tooltip/Tooltip.module.css";
import Rating from "../../../UI/Rating/Rating";
import BuyButton from "../../../UI/BuyButton/BuyButton";
import AddToWishListButton from "../../../UI/AddToWishListButton/AddToWishListButton";
import ViewRest from "../../../UI/ViewRest/ViewRest";
import ForwardLink from "../../../UI/ForwardLink/ForwardLink";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
  },
  skeleton: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  price: {
    marginBottom: 15,
    fontSize: 22,
    fontWeight: "bold",
  },
  list: {
    padding: 0,
  },
  listItem: {
    marginBottom: 8,
    padding: 0,
    fontSize: 14,
    lineHeight: 1,
  },
  warranty: {
    fontSize: 14,
    lineHeight: 1,
    cursor: "default",
  },
  span: {
    fontSize: 14,
    lineHeight: 1,
    borderBottom: "1px dashed",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
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
    color: "darkgray",
  },
  status: {
    fontSize: 13,
    textAlign: "center",
  },
}));

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

  const handleClick = () => {
    ReactTooltip.hide();
  };

  return (
    <Grid container className={classes.root}>
      <ReactTooltip className={stylesTooltip.tooltip} />
      <Grid item xs>
        <Typography className={classes.price}>{`${price} грн`}</Typography>
        <List className={classes.list}>
          <ListItem className={classes.listItem} disableGutters>
            <Typography
              component="span"
              className={classes.warranty}
              data-tip="Мы даем такой срок гарантии, который можем безоговорочно обеспечить, не вводя клиента в заблуждение и не заманивая нереальными гарантийными сроками."
            >
              {`Гарантия: ${warranty} мес.`}
            </Typography>
          </ListItem>
          <ListItem
            className={classes.listItem}
            onClick={handleClick}
            disableGutters
          >
            <ViewRest id={id} />
          </ListItem>
          <ListItem className={classes.listItem} disableGutters>
            <Link
              component={ForwardLink}
              smooth
              to={`/shop/video_cards/${id}#reviews`}
              className={classes.reviews}
            >{`Отзывы (${reviewsCount})`}</Link>
          </ListItem>
          <ListItem className={classes.listItem} disableGutters>
            <AddToWishListButton id={id} />
          </ListItem>
          <ListItem
            className={`${classes.listItem} ${classes.sku}`}
            disableGutters
          >{`Код товара: ${sku}`}</ListItem>
          <ListItem className={classes.listItem} disableGutters>
            <Typography component="span" className={classes.span}>
              Добавить к сравнению
            </Typography>
          </ListItem>
        </List>
      </Grid>
      <Grid item style={{ flexBasis: 100 }}>
        {totalRating > 0 && (
          <Rating totalRating={totalRating} ratingsCount={ratingsCount} />
        )}
        <BuyButton id={id} />
        <Typography className={classes.status} data-tip={tooltipText}>
          {status}
        </Typography>
      </Grid>
    </Grid>
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
