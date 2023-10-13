/**
 * Firebase config
 */

import firebase from 'firebase/compat/app';
require("firebase/database");
require('firebase/storage');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO6DEWdB3bKQBImmbfmgjhBRiBkXhhYNc",
  authDomain: "garageshell-bbe60.firebaseapp.com",
  databaseURL: "https://garageshell-bbe60-default-rtdb.firebaseio.com",
  projectId: "garageshell-bbe60",
  storageBucket: "garageshell-bbe60.appspot.com",
  messagingSenderId: "557881831127",
  appId: "1:557881831127:web:e71f81addc06dcfadd8a92",
  measurementId: "G-1Z46GTEQ4L"

};

firebase.initializeApp(firebaseConfig);

export default firebase;
