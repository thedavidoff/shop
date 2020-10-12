import React, { useState } from "react";
import { makeStyles, Typography, Button } from "@material-ui/core";
import * as PropTypes from "prop-types";

import Review from "./Review/Review";
import ReviewForm from "../../../Forms/ReviewForm/ReviewForm";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
  },
  noReviews: {
    fontSize: 13,
    padding: "0 15px 8px",
  },
  button: {
    marginBottom: 15,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    textTransform: "none",
    fontSize: 14,
    "&:hover": { backgroundColor: theme.palette.primary.dark },
  },
}));

const Reviews = ({
  reviews,
  sendReview,
  answers,
  answerModeId,
  setAnswerMode,
  sendAnswer,
}) => {
  const classes = useStyles();
  const onSubmitReview = (data) => sendReview(data);

  let [openReviewFormId, setOpenReviewFormId] = useState(0);
  const handleToggle = (id) => {
    id === openReviewFormId ? setOpenReviewFormId(0) : setOpenReviewFormId(id);
  };

  return (
    <div className={classes.root}>
      {!reviews.length && (
        <Typography className={classes.noReviews}>
          На данный товар отзывов нет, Ваш отзыв будет первым.
        </Typography>
      )}
      <Button
        size="small"
        variant="contained"
        className={classes.button}
        onClick={() => handleToggle(1)}
      >
        {openReviewFormId === 1 ? "Скрыть" : "Написать отзыв"}
      </Button>
      {openReviewFormId === 1 && <ReviewForm onSubmit={onSubmitReview} />}

      {reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
          answerModeId={answerModeId}
          sendAnswer={sendAnswer}
          answers={answers}
          setAnswerMode={setAnswerMode}
        />
      ))}
      {reviews.length && (
        <Button
          size="small"
          variant="contained"
          className={classes.button}
          onClick={() => handleToggle(2)}
        >
          {openReviewFormId === 2 ? "Скрыть" : "Написать отзыв"}
        </Button>
      )}
      {openReviewFormId === 2 && <ReviewForm onSubmit={onSubmitReview} />}
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array,
  sendReview: PropTypes.func,
  answers: PropTypes.array,
  answerModeId: PropTypes.number,
  setAnswerMode: PropTypes.func,
  sendAnswer: PropTypes.func,
};

export default Reviews;
