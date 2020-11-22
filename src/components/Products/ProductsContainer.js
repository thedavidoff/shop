import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import {makeStyles, Grid, useMediaQuery} from "@material-ui/core";
import * as PropTypes from "prop-types";

import { getIsLoaded, getProducts } from "../../redux/selectors";
import Hits from "../UI/Hit/Hits";
import Stats from "../UI/Stats/Stats";
import AlgoliaSVG from "../UI/SVG/AlgoliaSVG";
import Pagination from "../UI/Pagination/Pagination";

const useStyles = makeStyles(() => ({
  productsContainer: {
    display: "flex",
    flexWrap: "wrap",
    padding: 15,
  },
  grid: {
    alignItems: "center",
    marginTop: 30,
  },
}));

const ProductsContainer = (props) => {
  const classes = useStyles();
  const w600 = useMediaQuery("(max-width: 599px)");
  const w400 = useMediaQuery("(max-width: 399px)");

  return (
    <>
      <div className={classes.productsContainer} style={w400 ? { padding: "15px 0 0 0" } : null}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Видеокарты</title>
          <link rel="canonical" href="/" />
        </Helmet>
        <Stats />
        <Grid container style={w600 ? { justifyContent: "center" } : null}>
          <Hits isLoaded={props.isLoaded} />
          <Grid container className={classes.grid} style={w600 ? { flexDirection: "column" } : null}>
            <Grid item xs style={w600 ? { marginBottom: 30 } : null}>
              <Pagination />
            </Grid>
            <Grid item>
              <AlgoliaSVG />
            </Grid>
          </Grid>
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
