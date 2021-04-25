import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import {
  makeStyles,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell as TableCellMui,
  TableContainer,
  TableRow,
  Typography,
  Box,
  useMediaQuery,
  withStyles,
} from "@material-ui/core";
import * as PropTypes from "prop-types";

import OrderItem from "./ProductInOrder/OrderItem";
import OrderItemMobile from "./ProductInOrder/OrderItemMobile";
import { changeQuantity, deleteCartItem } from "../../../../redux/cartReducer";
import {
  getProducts,
  getProductsInCart,
  getTotalCost,
} from "../../../../redux/selectors";
import AddToWishListButton from "../../../UI/AddToWishListButton/AddToWishListButton";

const styles = () => ({
  tableCell: {
    whiteSpace: "nowrap",
  },
});

const TableCell = withStyles(styles)((props) => {
  const { children, classes, ...other } = props;
  const w400 = useMediaQuery("(max-width: 399px)");

  return (
    <TableCellMui
      className={classes.tableCell}
      {...other}
      style={w400 ? { padding: 10 } : null}
    >
      {children}
    </TableCellMui>
  );
});

const useStyles = makeStyles((theme) => ({
  order: {
    width: "100%",
  },
  title: {
    marginTop: 15,
    fontSize: 18,
    textAlign: "center",
  },
  row: {
    "& th": {
      borderBottom: "1px solid #bfbfbf",
    },
  },
  emptyCart: {
    display: "flex",
    justifyContent: "center",
  },
  totalRow: {
    backgroundColor: "#fff9bb",
    "& td": {
      padding: "8px 15px",
      borderBottom: "1px solid #bfbfbf",
    },
  },
  price: {
    color: theme.palette.secondary.dark,
  },
}));

const Order = (props) => {
  const classes = useStyles();
  const w1000 = useMediaQuery("(max-width: 999px)");
  const w400 = useMediaQuery("(max-width: 399px)");

  const productIds = [];
  props.productsInCart &&
    Object.values(props.productsInCart).map(({ id }) => productIds.push(id));

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Корзина / Оформление заказа</title>
        <link rel="canonical" href="/order" />
      </Helmet>
      <div
        className={classes.order}
        style={w400 ? { padding: "0 15px" } : { padding: "0 30px" }}
      >
        <Typography component="h2" className={classes.title}>
          Ваша корзина:
        </Typography>
        <>
          <TableContainer
            component={Paper}
            elevation={15}
            className={classes.tableContainer}
            style={w1000 ? { padding: "0 15px" } : null}
          >
            <Table className={classes.table} aria-label="Order table">
              {w1000 ? null : (
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
              )}
              <TableBody style={w1000 ? { display: "block" } : null}>
                {props.productsInCart &&
                Object.values(props.productsInCart).length > 0 ? (
                  Object.values(props.productsInCart).map(
                    ({ id, quantity }) => {
                      return w1000 ? (
                        <OrderItemMobile
                          key={id}
                          id={id}
                          product={props.products.find(
                            (product) => product.id === id
                          )}
                          quantity={quantity}
                          changeQuantity={props.changeQuantity}
                          deleteCartItem={props.deleteCartItem}
                        />
                      ) : (
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
                  <TableRow className={w1000 ? classes.emptyCart : null}>
                    <TableCell align="center" colSpan="6">
                      <b>Ваша корзина пуста</b>
                    </TableCell>
                  </TableRow>
                )}
                <TableRow
                  className={classes.totalRow}
                  style={
                    w1000
                      ? { display: "flex", justifyContent: "flex-end" }
                      : null
                  }
                >
                  <TableCell style={w1000 ? {borderBottom: "none"} : null} />
                  <TableCell style={w1000 ? {borderBottom: "none"} : null} />
                  <TableCell style={w1000 ? {borderBottom: "none"} : null} />
                  <TableCell style={w1000 ? {borderBottom: "none"} : null} align="center" className={classes.price}>
                    <b>К оплате:</b>
                  </TableCell>
                  <TableCell
                    style={w1000 ? {borderBottom: "none"} : null}
                    align="center"
                    colSpan="2"
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
