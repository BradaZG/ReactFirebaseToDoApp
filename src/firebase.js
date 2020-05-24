import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAD6U44An41mAb6I55XmoAGdS1_QUZtxgY",
  authDomain: "reactfirebasetodoapp.firebaseapp.com",
  databaseURL: "https://reactfirebasetodoapp.firebaseio.com",
  projectId: "reactfirebasetodoapp",
  storageBucket: "reactfirebasetodoapp.appspot.com",
  messagingSenderId: "140374909093",
  appId: "1:140374909093:web:a580d8a540c00d87a36d4c",
});

const db = firebaseApp.firestore();

export default db;
