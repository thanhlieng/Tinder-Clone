// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXN5uelhdt3RKPaB9idZPatsiNO4Uj5aE",
  authDomain: "rn-app-59deb.firebaseapp.com",
  projectId: "rn-app-59deb",
  storageBucket: "rn-app-59deb.appspot.com",
  messagingSenderId: "1073837368078",
  appId: "1:1073837368078:web:b4eb3dd041fa6c110c6d5f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
