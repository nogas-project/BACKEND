import { config } from "../config/config";
import fs from 'fs';
import path from 'path';

export function getFirebaseAdmin() {
    if (!config.firebasePath) {
        throw new Error("Firebase Admin SDK path not configured! Add the path in your .env (e.g SERVICE_ACCOUNT_PATH=../../nogas-12f19-firebase-adminsdk-fbsvc-9b30180fd6.json)");
    }
    
    const serviceAccountPath = path.resolve(__dirname, config.firebasePath);
    if (!fs.existsSync(serviceAccountPath)) {
        throw new Error(`Firebase Admin SDK file not found at ${serviceAccountPath}! Generate one in the Firebase console and ensure the path is correct.`);
    }
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    
    return serviceAccount;
}
