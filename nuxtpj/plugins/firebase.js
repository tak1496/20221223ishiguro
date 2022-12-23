import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAijr14v0_Q7cQlhkgt92CO9G3iav3tyaY",
    authDomain: "fir-pj-89c8c.firebaseapp.com",
    projectId: "fir-pj-89c8c",
    storageBucket: "fir-pj-89c8c.appspot.com",
    messagingSenderId: "263121050952",
    appId: "1:263121050952:web:1211e3987f00c71381e77d",
    measurementId: "G-T81VCZYRD8"
  });
}

export default firebase;