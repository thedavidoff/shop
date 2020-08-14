import { productAPI } from "../api/api";

const SET_PRODUCTS = "homeReducer/SET_PRODUCTS";
const TOGGLE_IS_FETCHING_PRODUCTS = "homeReducer/TOGGLE_IS_FETCHING_PRODUCTS";
const SET_RANGE_PRICES = "homeReducer/SET_RANGE_PRICES";
const SET_FILTERED_PRODUCTS = "homeReducer/SET_FILTERED_PRODUCTS";

const initialState = {
  products: [],
  isFetchingProducts: false,
  rangePrices: [0, 0],
  filteredProducts: [],
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
    case SET_RANGE_PRICES:
      const products = state.products.map(product => +product.price);
      return {
        ...state,
        rangePrices: [Math.min(...products), Math.max(...products)],
      };
    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: [...payload],
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
    dispatch({ type: SET_RANGE_PRICES });
    dispatch({ type: TOGGLE_IS_FETCHING_PRODUCTS, payload: false });
  };
};

export const filterProductsByPriceRequest = ([min, max]) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_FILTERED_PRODUCTS,
      payload: getState().homePage.products.filter(
        (product) => product.price >= min && product.price <= max
      ),
    });
  };
};

export default homeReducer;
