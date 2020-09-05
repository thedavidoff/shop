import { stopSubmit } from "redux-form";

const SET_REGISTRATION_FAILED = "authReducer/SET_REGISTRATION_FAILED";

const SET_INITIAL_VALUES_FOR_PROFILE_FORM =
  "authReducer/SET_INITIAL_VALUES_FOR_PROFILE_FORM";

const SET_NOTICE_TYPE = "authReducer/SET_NOTICE_TYPE";

const initialState = {
  regFailedMessage: null,
  initialValuesForProfileForm: null,
  noticeType: null,
  wishList: [],
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_REGISTRATION_FAILED:
      return {
        ...state,
        regFailedMessage: payload,
      };
    case SET_INITIAL_VALUES_FOR_PROFILE_FORM:
      return {
        ...state,
        initialValuesForProfileForm: payload,
      };
    case SET_NOTICE_TYPE:
      return {
        ...state,
        noticeType: payload,
      };
    default:
      return state;
  }
};

export const addToWishList = (id) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const ref = firebase.database().ref("users/" + user.uid + "/wishList");

    ref.push().set(id);

    // let result = [];
    // firebase
    //   .database()
    //   .ref("users/" + user.uid + "/wishList")
    //   .on("value", (snapshot) => {
    //     snapshot.forEach((childSnapshot) => {
    //       result.push(childSnapshot.val());
    //     });
    //   });
  };
};

export const removeFromWishList = (ids) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const wishList = getState().firebase.profile.wishList;
    const result = Object.fromEntries(
      Object.entries(wishList).map(([key, value]) => {
        ids.map((id) => (+id === value ? (value = null) : value));
        return [key, value];
      })
    );

    if (Object.keys(wishList).length === ids.length) {
      // delete the whole wishlist
      firebase
        .database()
        .ref("users/" + user.uid + "/wishList")
        .remove();
    }

    firebase
      .database()
      .ref("users/" + user.uid + "/wishList")
      .update(result);
  };
};

export const setInitialValuesForProfileForm = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    if (user) {
      firebase
        .database()
        .ref("users/" + user.uid)
        .on("value", (snap) => {
          dispatch({
            type: SET_INITIAL_VALUES_FOR_PROFILE_FORM,
            payload: snap.val(),
          });
        });
    }
  };
};

export const login = ({ email, password }) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          dispatch(
            stopSubmit("LoginForm", {
              email: "Неверный E-mail",
              password: true,
              _error: "Проверьте правильность ввода",
            })
          );
        }
        if (error.code === "auth/user-disabled") {
          dispatch(
            stopSubmit("LoginForm", {
              email: true,
              _error: "Пользователь с таким E-mail был отключен",
            })
          );
        }
        if (error.code === "auth/user-not-found") {
          dispatch(
            stopSubmit("LoginForm", {
              email: "Неверный E-mail",
              _error: "Пользователь с таким E-mail не найден в базе",
            })
          );
        }
        if (error.code === "auth/wrong-password") {
          dispatch(
            stopSubmit("LoginForm", {
              email: true,
              password: true,
              _error: "Неверный E-mail либо пароль",
            })
          );
        }
        if (error.code === "auth/too-many-requests") {
          dispatch(
            stopSubmit("LoginForm", { _error: "Слишком много запросов" })
          );
        }
      });
  };
};

export const logout = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SET_INITIAL_VALUES_FOR_PROFILE_FORM, payload: null });
        dispatch({ type: SET_NOTICE_TYPE, payload: null });
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };
};

export const registration = ({ email, password }) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    let countUsers = Date.now();
    firebase
      .database()
      .ref("users/")
      .once(
        "value",
        (snapshot) => (countUsers = snapshot.numChildren() + 1 + "")
      );

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: SET_NOTICE_TYPE, payload: "regSuccess" });

        firebase
          .updateAuth({
            displayName: `User_${countUsers.slice(
              countUsers.length - 10,
              countUsers.length
            )}`,
          })
          .then(() => {
            firebase
              .database()
              .ref("users/" + firebase.auth().currentUser.uid)
              .set({
                amountOfPurchases: 0,
                callBackWithAnOperatorRating: false,
                city: "",
                duplicateSmsViberToEmail: false,
                email: email,
                firstName: "",
                gender: 0,
                lastName: "",
                login: `User_${countUsers}`,
                patronymic: "",
                phone: "",
                priceLevel: "Розничный",
                receiveEmailAboutOrders: true,
                canChangeLogin: true,
              });
          });
      })
      .catch((error) => {
        dispatch({ type: SET_REGISTRATION_FAILED, payload: error.code });
        if (error.code === "auth/email-already-in-use") {
          dispatch(
            stopSubmit("RegistrationForm", {
              email: "Пользователь с таким E-mail уже существует",
              _error: "Возможно Вы уже регистрировались у нас?",
            })
          );
        }
        if (error.code === "auth/invalid-email") {
          dispatch(
            stopSubmit("RegistrationForm", {
              email: "Неверный E-mail",
              password: true,
              _error: "Проверьте правильность ввода",
            })
          );
        }
        if (error.code === "auth/operation-not-allowed") {
          dispatch(
            stopSubmit("RegistrationForm", {
              email: true,
              password: true,
              _error:
                "Включите учетные записи электронной почты и паролей в консоли Firebase на вкладке Auth.",
            })
          );
        }
        if (error.code === "auth/weak-password") {
          dispatch(
            stopSubmit("RegistrationForm", {
              password: "Пароль слишком прост",
              _error: "Придумайте пароль сложнее",
            })
          );
        }
        if (error.code === "auth/too-many-requests") {
          dispatch(
            stopSubmit("RegistrationForm", { _error: "Слишком много запросов" })
          );
        }
      });
  };
};

export const updateProfile = (data) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;

    user
      .updateEmail(data.email)
      .then(() => {
        firebase
          .database()
          .ref("users/" + user.uid)
          .update({ ...data, canChangeLogin: false })
          .then(() => {
            firebase
              .updateAuth({
                displayName: `${data.lastName} ${data.firstName} ${data.patronymic}`,
              })
              .then(() => {
                dispatch({
                  type: SET_NOTICE_TYPE,
                  payload: "profileUpdateSuccess",
                });
              });
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: SET_NOTICE_TYPE,
          payload: "profileUpdateFailed",
        });
        dispatch({ type: SET_NOTICE_TYPE, payload: error.code });
      });

    // firebase
    //   .database()
    //   .ref("users/" + user.uid)
    //   .update({ ...data, canChangeLogin: false })
    //   .then(() => {
    //     firebase
    //       .updateAuth({
    //         displayName: `${data.lastName} ${data.firstName} ${data.patronymic}`,
    //         phoneNumber: `${data.phone}`,
    //       })
    //       .then(() => {
    //         user
    //           .updateEmail(data.email)
    //           .then(() =>
    //             dispatch({
    //               type: SET_NOTICE_TYPE,
    //               payload: "profileUpdateSuccess",
    //             })
    //           )
    //           .catch((error) => {
    //             console.log(error.code);
    //             dispatch({ type: SET_NOTICE_TYPE, payload: error.code });
    //           });
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         dispatch({
    //           type: SET_NOTICE_TYPE,
    //           payload: "profileUpdateFailed",
    //         });
    //       });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     dispatch({
    //       type: SET_NOTICE_TYPE,
    //       payload: "profileUpdateFailed",
    //     });
    //   });
  };
};

export default authReducer;
