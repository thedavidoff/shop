import React from "react";
import StarRatingComponent from "react-star-rating-component";
import { makeStyles, Paper, Typography, Button } from "@material-ui/core";
import * as PropTypes from "prop-types";

import ReviewAnswerForm from "../../../../Forms/ReviewAnswerForm/ReviewAnswerForm";
import Answers from "./Answers/Answers";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 15,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 15px",
    borderBottom: "1px solid #ff8383",
    "& p": {
      fontSize: 13,
      color: theme.palette.primary.main,
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
  button: {
    padding: "0 10px",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    textTransform: "none",
    fontSize: 12,
    "&:hover": { backgroundColor: theme.palette.primary.dark },
  },
}));

const Review = ({
  answerModeId,
  setAnswerMode,
  sendAnswer,
  answers,
  review: {
    id,
    author,
    date,
    time,
    buyType,
    rating,
    advantages,
    disadvantages,
    comment,
  },
}) => {
  const classes = useStyles();
  const onSubmitAnswer = (data) => sendAnswer(data, id);
  const handleClick = async () => {
    await Promise.all([setAnswerMode(null)]);
    answerModeId === id ? setAnswerMode(null) : setAnswerMode(id);
  };

  return (
    <>
      <Paper elevation={15} id={id} className={classes.root}>
        <header className={classes.header}>
          <Typography>
            <b>{author}</b>
          </Typography>
          <time>{`${date} | ${time}`}</time>
        </header>
        <div className={classes.info}>
          <Typography className={classes.purchase}>
            {buyType === "1" && "Купил(а) этот товар у Вас в магазине"}
            {buyType === "2" && "Купил(а) этот товар в другом магазине"}
            {buyType === "3" && "Не покупал(а), но хочу поделиться мнением"}
          </Typography>
          <div style={{display: "flex", justifyContent: "flex-end", flexBasis: 95}}>
            {rating > 0 ? (
              <StarRatingComponent
                name="rateReview"
                value={rating}
                starColor="red"
                emptyStarColor="#adadad"
                editing={false}
              />
            ) : null}
          </div>
        </div>
        <div className={classes.comment}>
          {advantages ? (
            <pre>
              <b>Достоинства: </b>
              {advantages}
            </pre>
          ) : null}
          {disadvantages ? (
            <pre>
              <b>Недостатки: </b>
              {disadvantages}
            </pre>
          ) : null}
          {comment ? (
            <pre>
              {comment && (advantages || disadvantages) ? (
                <>
                  <b>Комментарий: </b>
                  <br />
                </>
              ) : null}
              {comment}
            </pre>
          ) : null}
          {!advantages && !disadvantages && !comment && (
            <pre>
              {rating === 5 && "Моя оценка - отлично (5 из 5)."}
              {rating === 4 && "Моя оценка - хорошо (4 из 5)."}
              {rating === 3 && "Моя оценка - нейтрально (3 из 5)."}
              {rating === 2 && "Моя оценка - плохо (2 из 5)."}
              {rating === 1 && "Моя оценка - ужасно (1 из 5)."}
            </pre>
          )}
          <Button className={classes.button} onClick={handleClick}>
            {answerModeId === id ? "Скрыть" : "Ответить"}
          </Button>
        </div>
      </Paper>
      {answerModeId === id && <ReviewAnswerForm onSubmit={onSubmitAnswer} />}
      <Answers answers={answers} id={id} />
    </>
  );
};

Review.propTypes = {
  answerModeId: PropTypes.number,
  setAnswerMode: PropTypes.func,
  sendAnswer: PropTypes.func,
  answers: PropTypes.array,
  id: PropTypes.number,
  author: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  buyType: PropTypes.string,
  rating: PropTypes.number,
  advantages: PropTypes.string,
  disadvantages: PropTypes.string,
  comment: PropTypes.string,
};

export default Review;
