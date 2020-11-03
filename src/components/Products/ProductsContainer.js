import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { makeStyles, Grid } from "@material-ui/core";
import * as PropTypes from "prop-types";

import { getIsLoaded, getProducts } from "../../redux/selectors";
import SkeletonCard from "../UI/SkeletonCard/SkeletonCard";
import Hits from "../UI/Hit/Hits";
import Stats from "../UI/Stats/Stats";
import AlgoliaSVG from "../UI/SVG/AlgoliaSVG";
import Pagination from "../UI/Pagination/Pagination";

const useStyles = makeStyles(() => ({
  productsContainer: {
    display: "flex",
    flexWrap: "wrap",
    padding: 30,
  },
  grid: {
    alignItems: "center",
    marginTop: 30
  }
}));

const ProductsContainer = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.productsContainer}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Видеокарты</title>
          <link rel="canonical" href="http://localhost:3000/shop" />
        </Helmet>
        <Stats />
        <Grid container>
          {props.isLoaded ? (
            <>
              <Hits />
              <Grid container className={classes.grid}>
                <Grid item xs><Pagination /></Grid>
                <Grid item><AlgoliaSVG /></Grid>
              </Grid>
            </>
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
};

const mapStateToProps = (state) => {
  return {
    isLoaded: getIsLoaded(state),
    products: getProducts(state),
  };
};

export default connect(mapStateToProps)(ProductsContainer);
