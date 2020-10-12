export const getProductById = (state, id) => {
  return state.homePage.products.find((product) => product.id === id);
};
export const getIsLoaded = (state) => {
  return state.homePage.isLoaded;
};
export const getProducts = (state) => {
  return state.homePage.products;
};
export const getFilteredProducts = (state) => {
  return state.homePage.filteredProducts;
};
export const getWishList = (state) => {
  let result = [];
  if (!state.firebase.profile.isEmpty && state.firebase.profile.wishList) {
    Object.values(state.firebase.profile.wishList).forEach((id) =>
      result.push(id)
    );
  }
  return result;
};

export const getIsFetchingProduct = (state) => {
  return state.productPage.isFetchingProduct;
};
export const getProduct = (state) => {
  return state.productPage.product;
};

export const getIsFetchingReviews = (state) => {
  return state.reviews.isFetchingReviews;
};
export const getReviews = (state) => {
  return state.reviews.reviews;
};
export const getIsFetchingAnswers = (state) => {
  return state.reviews.isFetchingAnswers;
};
export const getAnswers = (state) => {
  return state.reviews.answers;
};
export const getRating = (state) => {
  return state.reviews.rating;
};
export const getAnswerModeId = (state) => {
  return state.reviews.answerModeId;
};

export const getProductsInCart = (state) => {
  return !state.firebase.profile.isEmpty ? state.firebase.profile.cart : null;
};
export const getCountInCart = (state) => {
  if (!state.firebase.profile.isEmpty && state.firebase.profile.cart) {
    return Object.values(state.firebase.profile.cart).reduce(
      (acc, { quantity }) => acc + quantity,
      0
    );
  }
};

export const getTotalCost = (state) => {
  if (!state.firebase.profile.isEmpty && state.firebase.profile.cart) {
    return Object.values(state.firebase.profile.cart)
      .map(({ id, quantity }) => getProductById(state, id).price * quantity)
      .reduce((sum, price) => sum + price, 0);
  }
};

export const getIsAuth = (state) => {
  return state.firebase.auth;
};
export const getIsAnonymous = (state) => {
  return state.firebase.auth.isAnonymous;
};
export const getUserName = (state) => {
  return state.firebase.auth.displayName;
};
export const getProfile = (state) => {
  return state.firebase.profile;
};
export const getAuthErrorMessage = (state) => {
  return state.auth.authErrorMessage;
};
export const getRegFailedMessage = (state) => {
  return state.auth.regFailedMessage;
};

export const getInitialValues = (state) => {
  return state.auth.initialValuesForProfileForm;
};
export const getNoticeType = (state) => {
  return state.auth.noticeType;
};

// export const getFilteredProductsByPrice = (state) => {
//   const min = state.homePage.minPrice;
//   const max = state.homePage.maxPrice;
//   getProducts(state).filter((product) => product.price >= state.homePage.minPrice && product.price <= state.homePage.maxPrice);
// };
