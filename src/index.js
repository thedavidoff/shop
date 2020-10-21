import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase";
import { ThemeProvider } from "@material-ui/core/styles";
import * as serviceWorker from "./serviceWorker";

import "./index.css";
import App from "./App";
import store from "./redux/store";
import ScrollToTop from "./components/Utils/ScrollToTop";

import {
  firebaseConfig as fbConfig,
  reduxFirebase as rrfConfig,
} from "./config";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import theme from "./theme";

import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "I21C32G5C2",
  "85a7081843a79618290d2c0a18ddf6af"
);

firebase.initializeApp(fbConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={rrfConfig}
          dispatch={store.dispatch}
        >
          <ThemeProvider theme={theme}>
            <ScrollToTop>
              <InstantSearch indexName="dev_NAME" searchClient={searchClient}>
                <App />
              </InstantSearch>
            </ScrollToTop>
          </ThemeProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

getFirebase()
  .auth()
  .onAuthStateChanged(async (user) => {
    if (user && user.isAnonymous) {
      const ref = firebase.database().ref("users/" + user.uid + "/cart");
      Object.values(store.getState().auth.cart).map((item) => ref.push(item));
    }
    if (!user) await getFirebase().auth().signInAnonymously();
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
