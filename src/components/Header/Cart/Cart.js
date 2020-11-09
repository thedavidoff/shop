import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Button, Typography } from "@material-ui/core";
import * as PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    width: "231px",
    height: "70px",
    textTransform: "inherit",
    borderRadius: "4px",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  paragraph: {
    fontSize: "14px",
    color: "#fff",
  },
}));

const Cart = ({ countOfProductsInCart, totalCost }) => {
  const classes = useStyles();

  let totalCostStyle;
  if (totalCost > 10000000) totalCostStyle = { fontSize: "13px" };

  return (
    <Button component={Link} to="/order" className={classes.root}>
      {countOfProductsInCart > 0 ? (
        <div className={classes.wrapper}>
          <Typography className={classes.paragraph}>
            В вашей корзине:
          </Typography>
          <Typography className={classes.paragraph}>
            {countOfProductsInCart}
            {countOfProductsInCart === 0 && " товаров"}
            {countOfProductsInCart === 1 && " товар"}
            {countOfProductsInCart > 1 &&
              countOfProductsInCart < 5 &&
              " товара"}
            {countOfProductsInCart > 4 && " товаров"}
          </Typography>
          <Typography className={classes.paragraph} style={totalCostStyle}>
            <u>{`Общая стоимость: ${totalCost} грн`}</u>
          </Typography>
        </div>
      ) : (
        <Typography className={classes.paragraph}>
          Ваша корзина пуста
        </Typography>
      )}
    </Button>
  );
};

Cart.propTypes = {
  countOfProductsInCart: PropTypes.number,
  totalCost: PropTypes.number,
};

export default Cart;
