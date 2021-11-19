import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET
} from '@env';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';

//import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore();
//export { db, auth };


export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}
  
export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
    return signOut(auth)
}
