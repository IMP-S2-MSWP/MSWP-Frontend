// Import the functions you need from the SDKs you need
import {
  FIREBASE_KEY,
  FIREBASE_DOMAIN,
  FIREBASE_ID,
  FIREBASE_BUCKET,
  FIREBASE_MSG,
  FIREBASE_APP,
} from '@env';
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: FIREBASE_DOMAIN,
  projectId: FIREBASE_ID,
  storageBucket: FIREBASE_BUCKET,
  messagingSenderId: FIREBASE_MSG,
  appId: FIREBASE_APP,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};
