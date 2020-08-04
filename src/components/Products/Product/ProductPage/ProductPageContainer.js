import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

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
        <div className={styles.productPage}>
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
  productRequest: PropTypes.func,
  isFetchingProduct: PropTypes.bool,
  product: PropTypes.array
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
