import { productAPI } from "../api/api";
import { reset } from "redux-form";

const SET_REVIEWS = "productReducer/SET_REVIEWS";
const TOGGLE_IS_FETCHING_REVIEWS = "productReducer/TOGGLE_IS_FETCHING_REVIEWS";

const SEND_REVIEW = "productReducer/SEND_REVIEW";
const TOGGLE_IS_SENDING_REVIEW = "productReducer/TOGGLE_IS_SENDING_REVIEW";

const SET_RATING = "productReducer/SET_RATING";

const SET_ANSWER_MODE = "productReducer/SET_ANSWER_MODE";

const SET_ANSWERS = "productReducer/SET_ANSWERS";
const TOGGLE_IS_FETCHING_ANSWERS = "productReducer/TOGGLE_IS_FETCHING_ANSWERS";

const SEND_ANSWER = "productReducer/SEND_ANSWER";
const TOGGLE_IS_SENDING_ANSWER = "productReducer/TOGGLE_IS_SENDING_ANSWER";

const initialState = {
  reviews: [],
  isFetchingReviews: false,
  isOpenReviewFormId: 0,
  rating: 0,
  isSendingReview: false,
  answerModeId: null,
  answers: [],
  isFetchingAnswers: false,
};

const reviewsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_REVIEWS:
      return {
        ...state,
        reviews: [...payload],
      };
    case TOGGLE_IS_FETCHING_REVIEWS:
      return {
        ...state,
        isFetchingReviews: payload,
      };
    case SET_RATING:
      return {
        ...state,
        rating: payload,
      };
    case SEND_REVIEW:
      return {
        ...state,
        reviews: [{ ...payload }, ...state.reviews],
      };
    case TOGGLE_IS_SENDING_REVIEW:
      return {
        ...state,
        isSendingReview: payload,
      };
    case SET_ANSWER_MODE:
      return {
        ...state,
        answerModeId: payload,
      };
    case SET_ANSWERS:
      return {
        ...state,
        answers: [...payload],
      };
    case TOGGLE_IS_FETCHING_ANSWERS:
      return {
        ...state,
        isFetchingAnswers: payload,
      };
    case SEND_ANSWER:
      return {
        ...state,
        answers: [{ ...payload }, ...state.answers],
      };
    default:
      return state;
  }
};

export const setRating = (rating) => {
  return (dispatch) => {
    dispatch({ type: SET_RATING, payload: rating });
  };
};
export const sendReview = (review) => {
  console.log(review);
  return async (dispatch, getState) => {
    const data = {
      id: Date.now(),
      reviewTo: getState().productPage.product[0].id,
      author: "Admin",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().slice(0, -3),
      ...review,
      rating: getState().reviews.rating,
    };
    dispatch({ type: TOGGLE_IS_SENDING_REVIEW, payload: true });
    const response = await productAPI.sendReviewAPI(data);
      dispatch({
        type: SEND_REVIEW,
        payload: response,
      });
    dispatch({ type: SET_RATING, payload: 0 });
    dispatch(reset("ReviewForm"));
  };
};
export const sendAnswer = (answer, id) => {
  return async (dispatch, getState) => {
    const data = {
      id: Date.now(),
      answerTo: getState().productPage.product[0].id,
      answerToReview: id,
      author: "Admin",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().slice(0, -3),
      ...answer,
    };
    dispatch({ type: TOGGLE_IS_SENDING_ANSWER, payload: true });
    const response = await productAPI.sendAnswerAPI(data);
    dispatch({
      type: SEND_ANSWER,
      payload: response,
    });
    dispatch(reset("ReviewAnswerForm"));
    dispatch({ type: SET_ANSWER_MODE, payload: null });
  };
};

export const reviewsRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_IS_FETCHING_REVIEWS, payload: true });
    const response = await productAPI.getReviewsAPI(id);
    dispatch({ type: SET_REVIEWS, payload: response });
    dispatch({ type: TOGGLE_IS_FETCHING_REVIEWS, payload: false });
  };
};
export const answersRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_IS_FETCHING_ANSWERS, payload: true });
    const response = await productAPI.getAnswersAPI(id);
    dispatch({ type: SET_ANSWERS, payload: response });
    dispatch({ type: TOGGLE_IS_FETCHING_ANSWERS, payload: false });
  };
};
export const setAnswerMode = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_ANSWER_MODE, payload });
  };
};

export default reviewsReducer;
