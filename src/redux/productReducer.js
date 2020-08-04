import { productAPI } from "../api/api";

const SET_PRODUCT = "productReducer/SET_PRODUCT";
const TOGGLE_IS_FETCHING_PRODUCT = "productReducer/TOGGLE_IS_FETCHING_PRODUCT";

const initialState = {
  product: [],
  isFetchingProduct: false
};

const productReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_PRODUCT:
      return {
        ...state,
        product: [...payload],
      };
    case TOGGLE_IS_FETCHING_PRODUCT:
      return {
        ...state,
        isFetchingProduct: payload,
      };
    default:
      return state;
  }
};

export const productRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_IS_FETCHING_PRODUCT, payload: true });
    const response = await productAPI.getProductAPI(id);
    dispatch({ type: SET_PRODUCT, payload: [...response] });
    dispatch({ type: TOGGLE_IS_FETCHING_PRODUCT, payload: false });
  };
};

export default productReducer;
