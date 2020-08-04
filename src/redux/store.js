import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { getFirebase, firebaseReducer } from "react-redux-firebase";

import homeReducer from "./homeReducer";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import reviewsReducer from "./reviewsReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
  homePage: homeReducer,
  cartPage: cartReducer,
  productPage: productReducer,
  reviews: reviewsReducer,
  form: formReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(getFirebase)))
);

export default store;
