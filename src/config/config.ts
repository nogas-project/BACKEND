import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    ENV: process.env.NODE_ENV || 'development',
    firebasePath: process.env.SERVICE_ACCOUNT_PATH
}