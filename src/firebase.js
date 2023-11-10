import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpVBuBxamH0SyaNDXkKHsdSax2QBBWO10",
  authDomain: "disney-clone-876ce.firebaseapp.com",
  projectId: "disney-clone-876ce",
  storageBucket: "disney-clone-876ce.appspot.com",
  messagingSenderId: "555579321626",
  appId: "1:555579321626:web:c96523c5cd28ca20d290a3",
  measurementId: "G-EZ2LNEVEKL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
// const storage = firebase.storage();

export { auth, firebaseConfig, provider };
export default db;
