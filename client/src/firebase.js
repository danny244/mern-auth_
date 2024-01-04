// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-fac99.firebaseapp.com",
  projectId: "mern-auth-fac99",
  storageBucket: "mern-auth-fac99.appspot.com",
  messagingSenderId: "1057319131182",
  appId: "1:1057319131182:web:8d92ec2027431aebfc67bf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
