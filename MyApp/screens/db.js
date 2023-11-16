// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDldXXz4w8_ej0GehAIiIxpgFXc2eXtsI8",
  authDomain: "moblieproject-a2aac.firebaseapp.com",
  projectId: "moblieproject-a2aac",
  storageBucket: "moblieproject-a2aac.appspot.com",
  messagingSenderId: "90598864197",
  appId: "1:90598864197:web:df93faa815b140ac7d3a2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}