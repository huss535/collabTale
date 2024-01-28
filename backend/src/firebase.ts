import firebase from "firebase/compat/app";
import { getFirestore, Firestore } from 'firebase/firestore';
import "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

export const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MID

};
export const firebaseApp = firebase.initializeApp(config);

//export const db = getFirestore(firebaseApp);

