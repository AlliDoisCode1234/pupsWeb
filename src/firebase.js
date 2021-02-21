import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC2f7FPZYfFlPPvoyEnSOixW_IlzMBZ7aQ",
    authDomain: "pups-web-app.firebaseapp.com",
    projectId: "pups-web-app",
    storageBucket: "pups-web-app.appspot.com",
    messagingSenderId: "817669953579",
    appId: "1:817669953579:web:be6bf7017b07aaff23b26e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
