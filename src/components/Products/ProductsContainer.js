import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import Helmet from "react-helmet";
import * as PropTypes from "prop-types";

import Products from "./Products";
import {
  getIsLoaded,
  getProducts,
  getFilteredProducts,
} from "../../redux/selectors";
import SkeletonCard from "../UI/SkeletonCard/SkeletonCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: 30,
  },
  totalCount: {
    padding: "30px 45px 0",
  },
}));

const ProductsContainer = (props) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.totalCount}>{`Всего товаров: ${
        props.min || props.max || props.filteredProducts.length
          ? props.filteredProducts.length
          : props.products.length
      }`}</Typography>
      <div className={classes.root}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Видеокарты ${props.min || props.max ? "|" : ""}${
            props.min ? " от " + props.min + " грн" : ""
          }${props.max ? " до " + props.max + " грн" : ""}`}</title>
          <link rel="canonical" href="http://localhost:3000/shop" />
        </Helmet>
        <Grid container>
          {props.isLoaded ? (
            <Products
              products={
                props.min || props.max || props.filteredProducts.length > 0
                  ? props.filteredProducts
                  : props.products
              }
            />
          ) : (
            Array(36)
              .fill(undefined, undefined, undefined)
              .map((item, index) => <SkeletonCard key={index} />)
          )}
        </Grid>
      </div>
    </>
  );
};

ProductsContainer.propTypes = {
  isLoaded: PropTypes.bool,
  products: PropTypes.array,
  filteredProducts: PropTypes.array,
  min: PropTypes.number,
  max: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    isLoaded: getIsLoaded(state),
    products: getProducts(state),
    filteredProducts: getFilteredProducts(state),
  };
};

export default connect(mapStateToProps)(ProductsContainer);
