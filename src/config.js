export const firebaseConfig = {
  apiKey: "AIzaSyCEZbM2WlzPVKeUSCm8pZ1aQJ06pFiCJLQ",
  authDomain: "shop-57dc8.firebaseapp.com",
  databaseURL: "https://shop-57dc8.firebaseio.com",
  projectId: "shop-57dc8",
  storageBucket: "shop-57dc8.appspot.com",
  messagingSenderId: "837633023986",
  appId: "1:837633023986:web:c14cd095bd7977bc8e156b",
  measurementId: "G-WLGD7QFYJY",
};

export const reduxFirebase = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableLogging: false
};

export default { firebaseConfig, reduxFirebase }