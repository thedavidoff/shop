import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as PropTypes from "prop-types";

import { getIsFetchingProduct, getProduct } from "../../../../redux/selectors";
import { productRequest } from "../../../../redux/productReducer";
import ProductPage from "./ProductPage";
import Preloader from "../../../UI/Preloader/Preloader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: 30,
  },
}));

const ProductPageContainer = ({
  isFetchingProduct,
  product,
  productRequest,
  match,
}) => {
  const classes = useStyles();
  useEffect(() => {
    productRequest(+match.params.id);
  }, [productRequest, match]);

  return (
    <div className={classes.root}>
      <div>
        {isFetchingProduct ? (
          <Preloader type="productPage" />
        ) : (
          <ProductPage product={product[0]} />
        )}
      </div>
    </div>
  );
};

ProductPageContainer.propTypes = {
  isFetchingProduct: PropTypes.bool,
  product: PropTypes.array,
  productRequest: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isFetchingProduct: getIsFetchingProduct(state),
    product: getProduct(state),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { productRequest })
)(ProductPageContainer);
