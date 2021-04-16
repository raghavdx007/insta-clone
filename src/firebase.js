// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const fb = firebase.initializeApp({
apiKey: "AIzaSyBqbexWmYK6LCQEiC95hlzlDG4GGcQREWg",
authDomain: "insta-clone-5d07d.firebaseapp.com",
projectId: "insta-clone-5d07d",
storageBucket: "insta-clone-5d07d.appspot.com",
messagingSenderId: "154478588222",
appId: "1:154478588222:web:15be6831def0e639dbfc6f",
measurementId: "G-CBTDL1GR7B"
});


export const db = fb.firestore();
export const auth = fb.auth();
export const storage = fb.storage();
