import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT || 3001,
    ENV: process.env.NODE_ENV || 'development',
    firebasePath: process.env.SERVICE_ACCOUNT_PATH,
    JWT_SECRET: process.env.JWT_SECRET || "JWT_SECRET_NOGAS_TOKEN"
}