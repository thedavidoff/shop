import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import StarRatingComponent from "react-star-rating-component";
import { connect } from "react-redux";

import styles from "./ReviewForm.module.css";
import { getRating } from "../../../redux/selectors";
import { setRating } from "../../../redux/reviewsReducer";
import { textarea } from "../renderFields";

let ReviewForm = ({
  rating,
  setRating,
  pristine,
  submitting,
  handleSubmit,
}) => {
  let [fakeRating, setFakeRating] = useState(rating);
  const onStarClick = (nextValue) => setRating(nextValue);
  const onStarHover = (nextValue) => {
    return setFakeRating(nextValue);
  };
  const onStarHoverOut = () => {
    return setFakeRating(rating);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <table>
        <tbody>
          <tr>
            <th>Выберите оценку:</th>
            <td>
              <StarRatingComponent
                name="rate"
                value={fakeRating || rating}
                starColor="red"
                emptyStarColor="#adadad"
                onStarClick={onStarClick}
                onStarHover={onStarHover}
                onStarHoverOut={onStarHoverOut}
                className={styles.stars}
              />
              <Field name="rating" component="input" type="hidden" />
            </td>
          </tr>
          <tr>
            <th>Достоинства:</th>
            <td>
              <Field
                id="advantages"
                name="advantages"
                placeholder="Что Вам понравилось"
                component={textarea}
              />
            </td>
          </tr>
          <tr>
            <th>Недостатки:</th>
            <td>
              <Field
                id="disadvantages"
                name="disadvantages"
                placeholder="Что не оправдало ожиданий"
                component={textarea}
              />
            </td>
          </tr>
          <tr>
            <th>Комментарий:</th>
            <td>
              <Field
                id="comment"
                name="comment"
                placeholder="Другая информация или вопросы о товаре"
                component={textarea}
              />
            </td>
          </tr>
          <tr>
            <th>Место покупки:</th>
            <td>
              <label>
                <Field
                  name="buyType"
                  value="1"
                  component="input"
                  type="radio"
                />
                {` - у Вас в магазине`}
              </label>
              <label>
                <Field
                  name="buyType"
                  value="2"
                  component="input"
                  type="radio"
                />
                {` - в другом магазине`}
              </label>
              <label>
                <Field
                  name="buyType"
                  value="3"
                  component="input"
                  type="radio"
                />
                {` - не покупал(а), но хочу поделиться мнением`}
              </label>
              <p>
                Перед публикацией отзыва рекомендуем ознакомиться с правилами
                размещения отзывов и комментариев.
              </p>
              <button
                onClick={() => setFakeRating(0)}
                disabled={pristine || submitting}
              >
                Отправить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

ReviewForm = reduxForm({
  form: "ReviewForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ReviewForm);

const mapStateToProps = (state) => {
  return {
    rating: getRating(state),
    initialValues: {
      rating: getRating(state),
      buyType: "3",
    },
  };
};

export default connect(mapStateToProps, { setRating })(ReviewForm);
