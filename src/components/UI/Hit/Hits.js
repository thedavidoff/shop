import React from "react";
import { connectHits } from 'react-instantsearch-dom';
import * as PropTypes from "prop-types";

import Hit from "./Hit";

const Hits = ({ hits }) => {
  return hits.map((product) => (
    <Hit
      key={product.id}
      id={product.id}
      status={product.status}
      product={product}
    />
  ));
};

Hits.propTypes = {
  isLoaded: PropTypes.bool,
  hits: PropTypes.array,
};

export default connectHits(Hits);
