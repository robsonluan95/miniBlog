// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEyajPbKHAC66U2v4IgvytQXm_PE5L4l8",
  authDomain: "miniblog-f4b04.firebaseapp.com",
  projectId: "miniblog-f4b04",
  storageBucket: "miniblog-f4b04.appspot.com",
  messagingSenderId: "662165190691",
  appId: "1:662165190691:web:b2d7ce91c83211d35a5996",
  measurementId: "G-1ZE6L2WYEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export {db}