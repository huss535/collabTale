import firebase from "firebase/compat/app";
import { getFirestore, Firestore } from 'firebase/firestore';
import "firebase/firestore";

const config = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MID

};
console.log(import.meta.env.MID);
const app = firebase.initializeApp(config);

export const db = getFirestore(app);

