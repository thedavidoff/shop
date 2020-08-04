import React from "react";
import PropTypes from "prop-types";

import styles from "../../../../ProductPage/ProductPage.module.css";

const Answer = ({ answer }) => {
  return (
    <article key={answer.id} className={`${styles.review} ${styles.answer}`}>
      <header>
        <div className={styles.reviewName}>{answer.author}</div>
        <time>{`${answer.date} | ${answer.time}`}</time>
      </header>
      <div className={styles.reviewInfo}>
        <div className={styles.reviewPurchase}>
          {answer.buyType === "1" && "Купил(а) этот товар у Вас в магазине"}
          {answer.buyType === "2" && "Купил(а) этот товар в другом магазине"}
          {answer.buyType === "3" &&
            "Не покупал(а), но хочу поделиться мнением"}
        </div>
      </div>
      <div className={styles.reviewText}>
        <pre className={styles.reviewComment}>{answer.comment}</pre>
      </div>
    </article>
  );
};

Answer.propTypes = {
  answer: PropTypes.PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    buyType: PropTypes.string
  }),
};

export default Answer;
