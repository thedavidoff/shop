import React from "react";
import PropTypes from "prop-types";

import Answer from "./Answer/Answer";

const Answers = ({ answers, id }) => {
  return answers
    .filter((answer) => answer.answerToReview === id)
    .map((answer) => <Answer key={answer.id} answer={answer} />);
};

Answers.propTypes = {
  answers: PropTypes.array,
  id: PropTypes.number,
};

export default Answers;
