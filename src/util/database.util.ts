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
// cannot pay for a second a database for testing
export const db_contact_test = db.collection("EmergencyContact_test");
export const db_user_test = db.collection("User_test");
export const db_gas_test = db.collection("Gas_test");
export default db;
