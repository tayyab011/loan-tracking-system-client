// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNJRRi19goTcPtGUG-RuKCj7KKG1F86yc",
  authDomain: "loan-anagement-system.firebaseapp.com",
  projectId: "loan-anagement-system",
  storageBucket: "loan-anagement-system.firebasestorage.app",
  messagingSenderId: "86703516940",
  appId: "1:86703516940:web:090daec1a685f647826d29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);