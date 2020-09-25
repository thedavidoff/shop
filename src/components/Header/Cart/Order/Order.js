import React from "react";
import { connect } from "react-redux";
import {
  makeStyles,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Box,
} from "@material-ui/core";
import Helmet from "react-helmet";
import * as PropTypes from "prop-types";

import styles from "./Order.module.css";
import OrderItem from "./ProductInOrder/OrderItem";
import { changeQuantity, deleteCartItem } from "../../../../redux/cartReducer";
import {
  getProducts,
  getProductsInCart,
  getTotalCost,
} from "../../../../redux/selectors";
import AddToWishListButton from "../../../UI/AddToWishListButton/AddToWishListButton";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 16,
    fontSize: 18,
    textAlign: "center",
  },
  row: {
    "& th": {
      borderBottom: "1px solid #bfbfbf",
    },
  },
  totalRow: {
    backgroundColor: "#fff1a6",
    "& td": {
      padding: "8px 16px",
      borderBottom: "1px solid #bfbfbf"
    }
  },
  price: {
    color: theme.palette.secondary.dark,
  },
}));

const Order = (props) => {
  const classes = useStyles();

  const productIds = [];
  props.productsInCart &&
    Object.values(props.productsInCart).map(({ id }) => productIds.push(id));

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Корзина / Оформление заказа</title>
        <link rel="canonical" href="http://localhost:3000/order" />
      </Helmet>
      <div className={styles.order}>
        <Typography component="h2" className={classes.title}>
          Ваша корзина
        </Typography>
        <>
          <TableContainer
            component={Paper}
            elevation={15}
            className={classes.tableContainer}
          >
            <Table className={classes.table} aria-label="Order table">
              <TableHead>
                <TableRow className={classes.row}>
                  <TableCell />
                  <TableCell />
                  <TableCell align="center">Кол-во</TableCell>
                  <TableCell align="center">Цена</TableCell>
                  <TableCell align="center">Сумма</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {props.productsInCart &&
                Object.values(props.productsInCart).length > 0 ? (
                  Object.values(props.productsInCart).map(
                    ({ id, quantity }) => {
                      return (
                        <OrderItem
                          key={id}
                          id={id}
                          product={props.products.find(
                            (product) => product.id === id
                          )}
                          quantity={quantity}
                          changeQuantity={props.changeQuantity}
                          deleteCartItem={props.deleteCartItem}
                        />
                      );
                    }
                  )
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan="6">
                      <b>Ваша корзина пуста</b>
                    </TableCell>
                  </TableRow>
                )}
                <TableRow className={classes.totalRow}>
                  <TableCell />
                  <TableCell />
                  <TableCell align="center" className={classes.price}>
                    <b>К оплате:</b>
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan="3"
                    className={classes.price}
                  >
                    <b>{`${props.totalCost || 0} грн`}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="6">
                    {props.productsInCart &&
                    Object.values(props.productsInCart).length > 0 ? (
                      <Box width={240}>
                        <AddToWishListButton
                          text="Добавить все в список желаний"
                          id={productIds}
                        />
                      </Box>
                    ) : null}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </div>
    </>
  );
};

Order.propTypes = {
  products: PropTypes.array,
  productsInCart: PropTypes.object,
  changeQuantity: PropTypes.func,
  deleteCartItem: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    products: getProducts(state),
    productsInCart: getProductsInCart(state),
    totalCost: getTotalCost(state),
  };
};

export default connect(mapStateToProps, { changeQuantity, deleteCartItem })(
  Order
);
