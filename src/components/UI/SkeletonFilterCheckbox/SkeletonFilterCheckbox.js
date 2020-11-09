import React from "react";
import { makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(() => ({
  skeleton: {
    marginLeft: "10%",
  },
}));

const SkeletonFilterCheckbox = () => {
  const classes = useStyles();

  return (
    <>
      <Skeleton variant="rect" animation="wave" />
      <Skeleton
        variant="text"
        width="50%"
        className={classes.skeleton}
        animation="wave"
      />
      <Skeleton
        variant="text"
        width="30%"
        className={classes.skeleton}
        animation="wave"
      />
      <Skeleton
        variant="text"
        width="40%"
        className={classes.skeleton}
        animation="wave"
      />
    </>
  );
};

export default SkeletonFilterCheckbox;
