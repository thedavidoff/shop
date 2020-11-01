import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { makeStyles, Grid } from "@material-ui/core";
import * as PropTypes from "prop-types";

import { getIsLoaded, getProducts } from "../../redux/selectors";
import SkeletonCard from "../UI/SkeletonCard/SkeletonCard";
import Hits from "../UI/Hit/Hits";
import Pagination from "../UI/Pagination/Pagination";
import Stats from "../UI/Stats/Stats";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: 30,
  }
}));

const ProductsContainer = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
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
              <Pagination />
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
