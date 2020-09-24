import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles, Button, Link, Typography } from "@material-ui/core";
import * as PropTypes from "prop-types";

import { getProductsInCart } from "../../../redux/selectors";
import { addToCart } from "../../../redux/cartReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    textTransform: "none",
    fontSize: 13,
    lineHeight: 1.1,
    "&:hover": { backgroundColor: theme.palette.primary.dark },
  },
  countOfProducts: {
    width: "100%",
    paddingBottom: 2,
    position: "absolute",
    textAlign: "center",
    lineHeight: 1,
    background: "#fff9bb",
    border: "1px solid #f5d993",
    borderRadius: 4,
    "& span": {
      fontSize: 12,
      lineHeight: 1,
      color: "#bc8a11",
    },
  },
  link: {
    "&:hover": { color: theme.palette.secondary.main },
  },
}));

const BuyButton = ({ productsInCart, id, addToCart }) => {
  const classes = useStyles();

  let product;
  if (productsInCart)
    product = Object.values(productsInCart).find(
      (product) => product.id === id
    );

  return (
    <div className={classes.root}>
      <Button
        size="small"
        variant="contained"
        className={classes.button}
        onClick={() => addToCart(id)}
      >
        Добавить в корзину
      </Button>
      {product ? (
        <>
          <div className={classes.countOfProducts}>
            {product.quantity === 1 && (
              <Typography component="span">
                Товар добавлен в{" "}
                <Link
                  component={NavLink}
                  to={`/order`}
                  className={classes.link}
                  underline="always"
                >
                  корзину
                </Link>
              </Typography>
            )}
            {product.quantity > 1 && (
              <Typography component="span">
                Уже в{" "}
                <Link
                  component={NavLink}
                  to={`/order`}
                  className={classes.link}
                  underline="always"
                >
                  корзине
                </Link>
                <br />
                {` ${product.quantity} шт.`}
              </Typography>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

BuyButton.propTypes = {
  productsInCart: PropTypes.object,
  id: PropTypes.number,
  addToCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    productsInCart: getProductsInCart(state),
  };
};

export default connect(mapStateToProps, { addToCart })(BuyButton);
