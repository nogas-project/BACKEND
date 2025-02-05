import { config } from "../config/config";
import { getFirestore} from 'firebase-admin/firestore';
import admin from "firebase-admin";
import { getFirebaseAdmin } from "./firebaseSDK";
const serviceAccount = getFirebaseAdmin();
// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = getFirestore();
export const db_contact = db.collection("EmergencyContact");
export const db_user = db.collection("User");
export const db_gas = db.collection("Gas");
export default db;
