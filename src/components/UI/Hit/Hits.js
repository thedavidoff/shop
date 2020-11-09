import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { connectHits } from "react-instantsearch-dom";
import * as PropTypes from "prop-types";

import Hit from "./Hit";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

const Hits = ({ isLoaded, hits }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (hits.length > 0) dispatch({ type: "homeReducer/TOGGLE_IS_LOADED", payload: true });
  }, [hits.length, dispatch]);

  return isLoaded
    ? hits.map((product) => (
        <Hit
          key={product.id}
          id={product.id}
          status={product.status}
          product={product}
        />
      ))
    : Array(12)
        .fill(undefined, undefined, undefined)
        .map((item, index) => <SkeletonCard key={index} />);
};

Hits.propTypes = {
  isLoaded: PropTypes.bool,
  hits: PropTypes.array,
};

export default connectHits(Hits);
