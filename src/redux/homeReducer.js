import { productAPI } from "../api/api";

const SET_PRODUCTS = "homeReducer/SET_PRODUCTS";
const TOGGLE_IS_FETCHING_PRODUCTS = "homeReducer/TOGGLE_IS_FETCHING_PRODUCTS";

const initialState = {
  products: [],
  isFetchingProducts: false,
};

const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: [...payload],
      };
    case TOGGLE_IS_FETCHING_PRODUCTS:
      return {
        ...state,
        isFetchingProducts: payload,
      };
    default:
      return state;
  }
};

export const productsRequest = () => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_IS_FETCHING_PRODUCTS, payload: true });
    const response = await productAPI.getProductsAPI();
    dispatch({ type: SET_PRODUCTS, payload: response });
    dispatch({ type: TOGGLE_IS_FETCHING_PRODUCTS, payload: false });
  };
};

export default homeReducer;
