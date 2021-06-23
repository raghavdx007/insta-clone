// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const fb = firebase.initializeApp({
  apiKey: "AIzaSyC5-IujiyWZWkFksNfdllOqg5jHTvUSQEE",
  authDomain: "finstagram-01.firebaseapp.com",
  projectId: "finstagram-01",
  storageBucket: "finstagram-01.appspot.com",
  messagingSenderId: "984085177289",
  appId: "1:984085177289:web:063afac0bf7062de7f3e18",
  measurementId: "G-2STDME7XRG"
});
  

export const db = fb.firestore();
export const auth = fb.auth();
export const storage = fb.storage();
