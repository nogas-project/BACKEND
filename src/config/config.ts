import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    ENV: process.env.NODE_ENV || 'development',
    firebaseAdmin: process.env.FIREBASE_ADMIN_SDK
}