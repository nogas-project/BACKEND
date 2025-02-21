import nodemailer from 'nodemailer';
import {config} from "../config/config";
// NEED A GMAIL ACCOUNT WITH 2FA
// GENERATE PASSKEY - myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.GMAIL,
        pass: config.GMAIL_PASSWORD,
    }
})
export default transporter;