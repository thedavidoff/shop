const ADD_TO_CART = "cartReducer/ADD_TO_CART";
const CHANGE_QUANTITY = "cartReducer/CHANGE_QUANTITY";
const DELETE_CART_ITEM = "cartReducer/DELETE_CART_ITEM";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
    case CHANGE_QUANTITY:
    case DELETE_CART_ITEM:
      return {
        ...state,
        cart: [...payload],
      };
    default:
      return state;
  }
};

// export const addToCart = (id) => {
//   let ids;
//   let result = [];
//   if (Array.isArray(id)) {
//     ids = id;
//     ids.map((id) => result.push({ id: +id, quantity: 1 }));
//   } else result.push({ id, quantity: 1 });
//
//   return (dispatch, getState) => {
//     dispatch({
//       type: ADD_TO_CART,
//       payload: [...getState().cartPage.cart, ...result].reduce((acc, item) => {
//         const filtered = acc.find((product) => product.id === item.id);
//         filtered !== undefined ? filtered.quantity++ : acc.push({ ...item });
//         return acc;
//       }, []),
//     });
//   };
// };

export const addToCart = (id) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const ref = firebase.database().ref("users/" + user.uid + "/cart");
    const cart = getState().firebase.profile.cart;

    let ids;
    let innerIds = [];
    if (Array.isArray(id)) {
      ids = id;
      ids.map((id) => innerIds.push({ id: +id, quantity: 1 }));
    } else {
      innerIds.push({ id, quantity: 1 });
    }
    cart
      ? ref.update(
          Object.fromEntries(
            Object.entries(cart).map(([key, product]) => {
              innerIds.map((item) =>
                item.id === product.id
                  ? product.quantity++
                  : ref
                      .orderByChild("id")
                      .equalTo(item.id)
                      .once(
                        "value",
                        (snapshot) => {
                          snapshot.exists() ||
                          ref.push().set({ id: item.id, quantity: 1 })
                        }
                      )
              );
              return [key, product];
            })
          )
        )
      : innerIds.map((id) => ref.push().set(id));
  };
};

export const changeQuantity = (value, id) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const cart = getState().firebase.profile.cart;
    const result = Object.fromEntries(
      Object.entries(cart).map(([key, product]) => {
        if (product.id === id) product.quantity = +value;
        return [key, product];
      })
    );
    firebase
      .database()
      .ref("users/" + user.uid + "/cart")
      .update(result);
  };
  // return (dispatch, getState) => {
  //   dispatch({
  //     type: CHANGE_QUANTITY,
  //     payload: [...getState().cartPage.cart, { id, quantity: value }].reduce(
  //       (acc, item) => {
  //         const filtered = acc.find((product) => product.id === item.id);
  //         filtered !== undefined
  //           ? (filtered.quantity = +value)
  //           : acc.push({ ...item });
  //         return acc;
  //       },
  //       []
  //     ),
  //   });
  // };
};

export const deleteCartItem = (ids) => {
  // return (dispatch, getState) => {
  //   dispatch({
  //     type: DELETE_CART_ITEM,
  //     payload: getState().cartPage.cart.filter(
  //       (product) => product.id !== payload
  //     ),
  //   });
  // };
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const cart = getState().firebase.profile.cart;
    const result = Object.fromEntries(
      Object.entries(cart).map(([key, product]) => {
        Array.isArray(ids)
          ? ids.map((id) => (+id === product.id ? (product = null) : product))
          : (ids === product.id && (product = null));
        return [key, product];
      })
    );

    firebase
      .database()
      .ref("users/" + user.uid + "/cart")
      .update(result);
  };
};

export default cartReducer;
