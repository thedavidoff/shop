import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import styles from "../ReviewForm/ReviewForm.module.css";
import { getReviews } from "../../../redux/selectors";
import { required } from "../validate";
import { textarea } from "../renderFields";

let ReviewAnswerForm = ({ pristine, submitting, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <table>
        <tbody>
          <tr>
            <th>Комментарий:</th>
            <td>
              <Field
                id="comment"
                name="comment"
                placeholder="Укажите Ваш ответ"
                component={textarea}
                validate={[required]}
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
                Перед публикацией комментария рекомендуем ознакомиться с
                правилами размещения отзывов и комментариев.
              </p>
              <button disabled={pristine || submitting}>Отправить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

ReviewAnswerForm = reduxForm({
  form: "ReviewAnswerForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: true,
})(ReviewAnswerForm);

const mapStateToProps = (state) => {
  return {
    reviews: getReviews(state),
    initialValues: {
      buyType: "3",
    },
  };
};

export default connect(mapStateToProps)(ReviewAnswerForm);
