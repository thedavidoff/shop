import React from "react";
import { connectPagination } from "react-instantsearch-dom";
import MuiPagination from "@material-ui/lab/Pagination/Pagination";

const Pagination = (props) => {
  return (
    <MuiPagination
      classes={props.classes}
      count={props.nbPages}
      onChange={(_, page) => props.refine(page)}
      variant="outlined"
      shape="rounded"
      color="primary"
    />
  );
};

export default connectPagination(Pagination);
