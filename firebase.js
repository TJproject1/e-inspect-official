import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyCmtCPIewD6jravcLCpua3wWC4KqIOyVUI",
    authDomain: "e-inspect.firebaseapp.com",
    projectId: "e-inspect",
    storageBucket: "e-inspect.appspot.com",
    messagingSenderId: "306905549436",
    appId: "1:306905549436:web:5a1b96e390fe237e7057f9",
    measurementId: "G-N3QSN83LWM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)