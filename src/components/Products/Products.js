import React from "react";
import * as PropTypes from "prop-types";

import Product from "./Product/Product";

const Products = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <Product
          product={product}
          key={product.id}
          id={product.id}
          status={product.status}
        />
      ))}
    </>
  );
};

Products.propTypes = {
  products: PropTypes.array,
};

export default Products;
