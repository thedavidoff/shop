import React from "react";
import { connectStats } from "react-instantsearch-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  totalCount: {
    padding: "15px 30px 0",
  },
}));

const Stats = (props) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.totalCount}
    >{`Всего товаров: ${props.nbHits}`}</Typography>
  );
};

export default connectStats(Stats);
