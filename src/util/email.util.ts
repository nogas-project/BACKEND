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
export async function sendEmail(to:string, subject:string, mess:string): Promise<boolean> {
    try{
        if(!to || !subject || !mess){
            return false;
        }else{
            let response = await transporter.sendMail({
                to: to,
                subject: subject,
                text: mess,
            })
            return !!response.envelope;
        }
    }catch(err){
        return false;
    }
}