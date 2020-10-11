import React from "react";
import * as PropTypes from "prop-types";

import styles from "../ProductPage/ProductPage.module.css";
import ReviewForm from "../../../Forms/ReviewForm/ReviewForm";
import Review from "./Review/Review";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 15,
  },
  noReviews: {
    fontSize: 13,
    padding: "0 15px 8px",
  },
}));

const Reviews = ({
  reviews,
  toggleIsOpenReviewForm,
  sendReview,
  answers,
  answerModeId,
  isOpenReviewFormId,
  setAnswerMode,
  sendAnswer,
}) => {
  const classes = useStyles();
  const onSubmitReview = (data) => sendReview(data);
  const toggle = (id) => toggleIsOpenReviewForm(id);

  return (
    <div className={classes.root}>
      {!reviews.length && (
        <Typography className={classes.noReviews}>
          На данный товар отзывов нет, Ваш отзыв будет первым.
        </Typography>
      )}
      <button onClick={() => toggle(1)} className={styles.writeReview}>
        {isOpenReviewFormId === 1 ? "Скрыть" : "Написать отзыв"}
      </button>
      {isOpenReviewFormId === 1 && <ReviewForm onSubmit={onSubmitReview} />}

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
        <button onClick={() => toggle(2)} className={styles.writeReview}>
          {isOpenReviewFormId === 2 ? "Скрыть" : "Написать отзыв"}
        </button>
      )}
      {isOpenReviewFormId === 2 && <ReviewForm onSubmit={onSubmitReview} />}
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array,
  toggleIsOpenReviewForm: PropTypes.func,
  sendReview: PropTypes.func,
  answers: PropTypes.array,
  answerModeId: PropTypes.number,
  isOpenReviewFormId: PropTypes.number,
  setAnswerMode: PropTypes.func,
  sendAnswer: PropTypes.func,
};

export default Reviews;
