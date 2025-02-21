import transporter from "../util/email.util";
import {ContactService} from "./contact.service";
export class EmailService {

    public static async sendEmail(to:string, subject:string, mess:string): Promise<boolean> {
        try{
            if(!to || !subject || !mess){
                return false;
            }else{
                let response = await transporter.sendMail({
                    to: to,
                    subject: subject,
                    html: `<h1>NoGas notification</h1> <h2>This is an automated message. Please do not reply.</h2> <p>${mess}</p>`
                })
                return !!response.envelope;
            }
        }catch(err){
            return false;
        }
    }
    public static async sendEmailToContact(subject:string, mess:string, userID:number): Promise<boolean> {
        try{
            if(!subject || !mess || !userID){
                return false;
            }else{
                let getContacts = await ContactService.getContacts(userID);
                let mailList:string[] = [];
                if(getContacts == null || !getContacts.length) return false;
                getContacts.map(contact => {
                    mailList.push(contact.email);
                })
                let response = await transporter.sendMail({
                    to: mailList,
                    subject: subject,
                    html: `<h1>NoGas notification</h1> <h2>This is an automated message. Please do not reply.</h2> <p>${mess}</p>`
                })
                return !!response.envelope;
            }
        }catch(err){
            return false;
        }
    }
}