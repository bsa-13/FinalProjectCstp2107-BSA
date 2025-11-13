// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaARx_NLSTgSZY1gSSfnhkKKFxFDKstNY",
  authDomain: "autofix-b2a80.firebaseapp.com",
  projectId: "autofix-b2a80",
  storageBucket: "autofix-b2a80.firebasestorage.app",
  messagingSenderId: "877381070143",
  appId: "1:877381070143:web:beded4c8d43b4f8d71b78a",
  measurementId: "G-EHL19LR4J2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
