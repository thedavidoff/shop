import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import {
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import Helmet from "react-helmet";
import * as PropTypes from "prop-types";

import styles from "./WishList.module.css";
import stylesTooltip from "../../UI/Tooltip/Tooltip.module.css";
import {
  getProducts,
  getProductsInCart,
  getWishList,
} from "../../../redux/selectors";
import { addToCart } from "../../../redux/cartReducer";
import { removeFromWishList } from "../../../redux/authReducer";
import Item from "./WishListItem/WishListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 30,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  selectActions: {
    padding: "5px 15px",
    width: "100%",
    backgroundColor: "#fff4ce",
    "& p": {
      fontSize: 14,
    },
    "& span": {
      margin: "0 15px",
      fontSize: 12,
      lineHeight: 1,
      borderBottom: "1px dashed",
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
  },
  tableContainer: {
    overflowX: "visible",
  },
  totalCost: {
    textAlign: "right",
  },
}));

const WishList = ({
  products,
  productsInCart,
  wishList,
  addToCart,
  removeFromWishList,
}) => {
  const classes = useStyles();

  const [isSelected, setIsSelected] = useState();

  useEffect(() => {
    setIsSelected(
      Object.fromEntries(
        Object.entries(wishList).map(([, id]) => {
          let key = id;
          let value = false;
          return [key, value];
        })
      )
    );
  }, [wishList]);

  const toggleSelectedAll = () => {
    setIsSelected(
      Object.fromEntries(
        Object.entries(isSelected).map(([id, value]) => {
          Object.values(isSelected).includes(false)
            ? (value = true)
            : (value = false);
          return [id, value];
        })
      )
    );
  };

  const handleSelectedItems = (e) => {
    const id = e.target.id;
    if (e.target.checked && !isSelected[id])
      setIsSelected({ ...isSelected, [id]: true });
    if (!e.target.checked && isSelected[id]) {
      setIsSelected({ ...isSelected, [id]: false });
    }
  };

  let selectedItems;
  if (isSelected)
    selectedItems = Object.keys(isSelected).filter(
      (id) => isSelected[id] === true
    );

  const removeSelectedItems = () => {
    removeFromWishList(selectedItems);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Список желаний | Профиль</title>
        <link
          rel="canonical"
          href="http://localhost:3000/profile?tab=wishlist"
        />
      </Helmet>
      <div className={classes.root}>
        <Typography component="h2" className={classes.title}>
          Мой список желаний:
        </Typography>
        <ReactTooltip className={stylesTooltip.tooltip} />
        {wishList && wishList.length > 0 ? (
          <TableContainer
            component={Paper}
            elevation={15}
            className={classes.tableContainer}
          >
            <Table className={classes.table} aria-label="Wishlist table">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className={classes.selectActions}>
                    <Typography>
                      Выберите действия с отмеченными товарами:
                    </Typography>
                    <Typography component="span" onClick={toggleSelectedAll}>
                      Выбрать все
                    </Typography>
                    <Typography
                      component="span"
                      onClick={() => addToCart(selectedItems)}
                    >
                      Добавить в корзину
                    </Typography>
                    <Typography component="span" onClick={removeSelectedItems}>
                      Удалить из списка
                    </Typography>
                  </TableCell>
                </TableRow>
                {wishList.map((id) => (
                  <Item
                    key={id}
                    products={productsInCart}
                    product={products.find((product) => product.id === id)}
                    handleCheckedItems={handleSelectedItems}
                    isSelected={isSelected && isSelected[id]}
                  />
                ))}
                <TableRow>
                  <TableCell colSpan="4" className={classes.totalCost}>
                    <Typography>
                      Общая сумма:{" "}
                      <Typography component="span">
                        <b>{`${wishList
                          .map(
                            (id) =>
                              products.find((product) => product.id === id)
                                .price
                          )
                          .reduce((sum, price) => sum + price, 0)} грн`}</b>
                      </Typography>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className={styles.emptyWishList}>
            <p>Этот список пуст</p>
            <p>
              Чтобы добавить сюда товары, нажимайте ссылки "В список желаний" на
              страницах сайта.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

WishList.propTypes = {
  products: PropTypes.array,
  productsInCart: PropTypes.object,
  wishList: PropTypes.array,
  addToCart: PropTypes.func,
  removeFromWishList: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    products: getProducts(state),
    productsInCart: getProductsInCart(state),
    wishList: getWishList(state),
  };
};

export default connect(mapStateToProps, { addToCart, removeFromWishList })(
  WishList
);
