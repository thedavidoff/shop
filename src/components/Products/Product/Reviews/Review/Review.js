import React from "react";
import StarRatingComponent from "react-star-rating-component";
import PropTypes from "prop-types";

import styles from "../../ProductPage/ProductPage.module.css";
import ReviewAnswerForm from "../../../../Forms/ReviewAnswerForm/ReviewAnswerForm";
import Answers from "./Answers/Answers";

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
  const onSubmitAnswer = (data) => sendAnswer(data, id);

  return (
    <>
      <article id={id} className={styles.review}>
        <header>
          <div className={styles.reviewName}>{author}</div>
          <time>{`${date} | ${time}`}</time>
        </header>
        <div className={styles.reviewInfo}>
          <div className={styles.reviewPurchase}>
            {buyType === "1" && "Купил(а) этот товар у Вас в магазине"}
            {buyType === "2" && "Купил(а) этот товар в другом магазине"}
            {buyType === "3" && "Не покупал(а), но хочу поделиться мнением"}
          </div>
          <div className={styles.reviewRating}>
            {rating > 0 ? (
              <StarRatingComponent
                name="rateReview"
                value={rating}
                starColor="red"
                emptyStarColor="#adadad"
                editing={false}
                className={styles.stars}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.reviewText}>
          {advantages ? (
            <pre className={styles.reviewAdvantages}>
              <b>Достоинства: </b>
              {advantages}
            </pre>
          ) : null}
          {disadvantages ? (
            <pre className={styles.reviewDisadvantages}>
              <b>Недостатки: </b>
              {disadvantages}
            </pre>
          ) : null}
          {comment ? (
            <pre className={styles.reviewComment}>
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
            <pre className={styles.reviewComment}>
              {rating === 5 && "Моя оценка - отлично (5 из 5)."}
              {rating === 4 && "Моя оценка - хорошо (4 из 5)."}
              {rating === 3 && "Моя оценка - нейтрально (3 из 5)."}
              {rating === 2 && "Моя оценка - плохо (2 из 5)."}
              {rating === 1 && "Моя оценка - ужасно (1 из 5)."}
            </pre>
          )}
          <button
            onClick={() => setAnswerMode(id)}
            className={styles.reviewAnswer}
          >
            Ответить
          </button>
        </div>
      </article>
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
