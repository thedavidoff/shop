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
    <div className={styles.wrapper}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Видеокарты</title>
        <link
          rel="canonical"
          href="http://localhost:3000/products"
        />
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
  );
};

ProductsContainer.propTypes = {
  isFetchingProducts: PropTypes.bool,
  products: PropTypes.array,
  productsInCart: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    isFetchingProducts: getIsFetchingProducts(state),
    products: getProducts(state),
    productsInCart: getProductsInCart(state),
  };
};

export default connect(mapStateToProps)(ProductsContainer);
