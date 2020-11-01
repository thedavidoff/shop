import React from "react";
import { connectPagination } from "react-instantsearch-dom";
import { withStyles } from "@material-ui/core";
import MuiPagination from "@material-ui/lab/Pagination/Pagination";

const Pagination = withStyles({
  root: {
    width: "100%",
    marginTop: 30
  },
})((props) => {
  return (
    <MuiPagination
      count={props.nbPages}
      onChange={(_, page) => props.refine(page)}
      variant="outlined"
      shape="rounded"
      {...props}
    />
  );
});

export default connectPagination(Pagination);
