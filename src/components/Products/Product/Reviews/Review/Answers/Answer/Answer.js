import React from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import * as PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 15,
    marginLeft: 30,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 15px",
    borderBottom: "1px solid #ff8383",
    backgroundColor: "#ffe2a1",
    "& p": {
      fontSize: 13,
      color: theme.palette.primary.main
    },
    "& time": {
      fontSize: 13,
    },
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 15px",
    backgroundColor: "#fff9bb",
  },
  purchase: {
    fontSize: 13,
    color: "#f59b21",
  },
  comment: {
    padding: "15px 30px",
    "& pre": {
      marginTop: 0,
      fontSize: 14,
      whiteSpace: "pre-wrap",
    },
  },
}));

const Answer = ({ answer }) => {
  const classes = useStyles();

  return (
    <Paper elevation={15} key={answer.id} className={classes.root}>
      <header className={classes.header}>
        <Typography><b>{answer.author}</b></Typography>
        <time>{`${answer.date} | ${answer.time}`}</time>
      </header>
      <div className={classes.info}>
        <Typography className={classes.purchase}>
          {answer.buyType === "1" && "Купил(а) этот товар у Вас в магазине"}
          {answer.buyType === "2" && "Купил(а) этот товар в другом магазине"}
          {answer.buyType === "3" &&
            "Не покупал(а), но хочу поделиться мнением"}
        </Typography>
      </div>
      <div className={classes.comment}>
        <pre>{answer.comment}</pre>
      </div>
    </Paper>
  );
};

Answer.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    buyType: PropTypes.string,
  }),
};

export default Answer;
