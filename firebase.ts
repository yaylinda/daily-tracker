// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKLG5SkIclQf1v5XjHCyrWymoH8VwsC_A",
  authDomain: "life-as-booleans.firebaseapp.com",
  projectId: "life-as-booleans",
  storageBucket: "life-as-booleans.appspot.com",
  messagingSenderId: "585449294232",
  appId: "1:585449294232:web:67b10d494a6556bab243ed",
  measurementId: "G-J72YCNCC6Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
