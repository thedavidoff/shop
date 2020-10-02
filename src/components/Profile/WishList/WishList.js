import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import {
  makeStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
} from "@material-ui/core";
import Helmet from "react-helmet";
import * as PropTypes from "prop-types";

import stylesTooltip from "../../UI/Tooltip/Tooltip.module.css";
import {
  getProducts,
  getProductsInCart,
  getWishList,
} from "../../../redux/selectors";
import { addToCart } from "../../../redux/cartReducer";
import { removeFromWishList } from "../../../redux/authReducer";
import WishListItem from "./WishListItem/WishListItem";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 16,
    fontSize: 18,
    textAlign: "center",
  },
  selectActions: {
    padding: "5px 15px",
    width: "100%",
    backgroundColor: "#fff9bb",
    borderBottom: "1px solid #bfbfbf",
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
  empty: {
    "& p:first-child": {
      marginTop: 20,
    },
    "& p": {
      fontSize: 14,
      textAlign: "center",
    },
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
      <Typography component="h2" className={classes.title}>
        Мой список желаний:
      </Typography>
      <ReactTooltip className={stylesTooltip.tooltip} />
      {wishList && wishList.length > 0 ? (
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
              <WishListItem
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
                          products.find((product) => product.id === id).price
                      )
                      .reduce((sum, price) => sum + price, 0)} грн`}</b>
                  </Typography>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Box className={classes.empty}>
          <Typography>Этот список пуст</Typography>
          <Typography>
            Чтобы добавить сюда товары, нажимайте ссылки "В список желаний" на
            страницах сайта.
          </Typography>
        </Box>
      )}
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
