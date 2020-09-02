import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from "./ProductContainer.module.css";
import Products from "./Products";
import {
  getIsFetchingProducts,
  getProducts,
  getProductsInCart,
} from "../../redux/selectors";
import Preloader from "../UI/Preloader/Preloader";

const ProductsContainer = (props) => {
  return (
    <>
      <div className={styles.totalCount}>{`Всего товаров: ${
        (props.min || props.max) || props.filteredProducts.length
          ? props.filteredProducts.length
          : props.products.length
      }`}</div>
      <div className={styles.wrapper}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Видеокарты ${props.min || props.max ? "|" : ""}${
            props.min ? " от " + props.min + " грн" : ""
          }${props.max ? " до " + props.max + " грн" : ""}`}</title>
          <link rel="canonical" href="http://localhost:3000/shop" />
        </Helmet>
        {props.isFetchingProducts ? (
          <Preloader type="products" />
        ) : (
          <Products
            products={
              (props.min || props.max) || props.filteredProducts.length > 0 ? props.filteredProducts : props.products
            }
            productsInCart={props.productsInCart}
          />
        )}
      </div>
    </>
  );
};

ProductsContainer.propTypes = {
  isFetchingProducts: PropTypes.bool,
  products: PropTypes.array,
  filteredProducts: PropTypes.array,
  productsInCart: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    isFetchingProducts: getIsFetchingProducts(state),
    products: getProducts(state),
    productsInCart: getProductsInCart(state),
    filteredProducts: state.homePage.filteredProducts,
  };
};

export default connect(mapStateToProps)(ProductsContainer);
