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
      <div className={styles.totalCount}>{`Всего товаров: ${props.products.length}`}</div>
      <div className={styles.wrapper}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Видеокарты ${props.minPrice || props.maxPrice ? "|" : ""}${
            props.minPrice ? " от " + props.minPrice + " грн" : ""
          }${props.maxPrice ? " до " + props.maxPrice + " грн" : ""}`}</title>
          <link rel="canonical" href="http://localhost:3000/shop" />
        </Helmet>
        {props.isFetchingProducts ? (
          <Preloader type="products" />
        ) : (
          <Products
            products={props.products}
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
  productsInCart: PropTypes.object,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    isFetchingProducts: getIsFetchingProducts(state),
    // products: getProducts(state),
    productsInCart: getProductsInCart(state),
    products: state.homePage.filteredProducts,
  };
};

export default connect(mapStateToProps)(ProductsContainer);
