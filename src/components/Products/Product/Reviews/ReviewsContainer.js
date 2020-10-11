import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import * as PropTypes from "prop-types";

import {
  getAnswerModeId,
  getAnswers,
  getIsFetchingAnswers,
  getIsFetchingReviews,
  getIsOpenReviewFormId,
  getReviews,
} from "../../../../redux/selectors";
import {
  reviewsRequest,
  answersRequest,
  toggleIsOpenReviewForm,
  sendReview,
  setAnswerMode,
  sendAnswer,
} from "./../../../../redux/reviewsReducer";
import Reviews from "./Reviews";
import Preloader from "../../../UI/Preloader/Preloader";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 15,
    padding: "0 15px",
  },
  title: {
    fontSize: 15
  },
}));

const ReviewsContainer = ({
  reviewsRequest,
  answersRequest,
  match,
  ...props
}) => {
  const classes = useStyles();

  useEffect(() => {
    reviewsRequest(+match.params.id);
    answersRequest(+match.params.id);
  }, [match.params.id, reviewsRequest, answersRequest]);

  return (
    <div className={classes.root}>
      {props.isFetchingReviews ? (
        <Preloader type="reviews" />
      ) : (
        <>
          <Typography component="h2" id="reviews" className={classes.title}>
            <b>Отзывы покупателей</b>
          </Typography>
          <Reviews
            reviews={props.reviews}
            toggleIsOpenReviewForm={props.toggleIsOpenReviewForm}
            sendReview={props.sendReview}
            setAnswerMode={props.setAnswerMode}
            sendAnswer={props.sendAnswer}
            answers={props.answers}
            answerModeId={props.answerModeId}
            isOpenReviewFormId={props.isOpenReviewFormId}
          />
        </>
      )}
    </div>
  );
};

ReviewsContainer.propTypes = {
  reviewsRequest: PropTypes.func,
  answersRequest: PropTypes.func,
  isFetchingReviews: PropTypes.bool,
  reviews: PropTypes.array,
  toggleIsOpenReviewForm: PropTypes.func,
  sendReview: PropTypes.func,
  setAnswerMode: PropTypes.func,
  sendAnswer: PropTypes.func,
  answers: PropTypes.array,
  answerModeId: PropTypes.number,
  isOpenReviewFormId: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    reviews: getReviews(state),
    isFetchingReviews: getIsFetchingReviews(state),
    answers: getAnswers(state),
    isFetchingAnswers: getIsFetchingAnswers(state),
    answerModeId: getAnswerModeId(state),
    isOpenReviewFormId: getIsOpenReviewFormId(state),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    reviewsRequest,
    answersRequest,
    toggleIsOpenReviewForm,
    sendReview,
    setAnswerMode,
    sendAnswer,
  })
)(ReviewsContainer);
