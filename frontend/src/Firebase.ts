import { FirebaseApp, initializeApp } from "firebase/app";
import axios from "axios";
import { Auth, getAuth } from "firebase/auth";


const getFirebaseApp = async () => {
    const response = await axios.get(import.meta.env.VITE_API + "/firebaseConfig");
    const firebaseApp: FirebaseApp = initializeApp(response.data);
    return firebaseApp;
};

export const firebaseApp: FirebaseApp = await getFirebaseApp();
export const auth: Auth = getAuth(firebaseApp);