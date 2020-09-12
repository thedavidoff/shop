import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import * as PropTypes from "prop-types";

import styles from "../../ProductContainer.module.css";
import { getIsFetchingProduct, getProduct } from "../../../../redux/selectors";
import { productRequest } from "../../../../redux/productReducer";
import ProductPage from "./ProductPage";
import Preloader from "../../../UI/Preloader/Preloader";

class ProductPageContainer extends Component {
  componentDidMount() {
    this.props.productRequest(+this.props.match.params.id);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div>
          {this.props.isFetchingProduct ? (
            <Preloader type="productPage" />
          ) : (
            <ProductPage product={this.props.product[0]} />
          )}
        </div>
      </div>
    );
  }
}

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
