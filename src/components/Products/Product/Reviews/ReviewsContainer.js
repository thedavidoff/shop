import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "../ProductPage/ProductPage.module.css";
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

class ReviewsContainer extends Component {
  componentDidMount() {
    this.props.reviewsRequest(+this.props.match.params.id);
    this.props.answersRequest(+this.props.match.params.id);
  }

  render() {
    return (
      <div className={styles.reviewsBlock}>
        <div className={styles.reviews}>
          {this.props.isFetchingReviews ? (
            <Preloader type="reviews" />
          ) : (
            <>
              <h2 id="reviews">Отзывы покупателей</h2>
              <Reviews
                reviews={this.props.reviews}
                toggleIsOpenReviewForm={this.props.toggleIsOpenReviewForm}
                sendReview={this.props.sendReview}
                setAnswerMode={this.props.setAnswerMode}
                sendAnswer={this.props.sendAnswer}
                answers={this.props.answers}
                answerModeId={this.props.answerModeId}
                isOpenReviewFormId={this.props.isOpenReviewFormId}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

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
