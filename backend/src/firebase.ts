import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";


dotenv.config();

const firebaseAdminKey = process.env.FIREBASE_ADMIN_KEY;
if (!firebaseAdminKey) {
    throw new Error("FIREBASE_ADMIN_KEY environment variable is not defined");
}

const serviceAccount = JSON.parse(firebaseAdminKey);

export const firebaseApp: admin.app.App = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: process.env.STORAGRE_BUCKET

})

export const db: Firestore = getFirestore(firebaseApp);
export const bucket = getStorage(firebaseApp).bucket();
export const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGRE_BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASURMENT_ID
};
