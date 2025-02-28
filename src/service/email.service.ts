import transporter from "../util/email.util";
import {ContactService} from "./contact.service";
import {UserService} from "./user.service";
import {loggerService as logger} from "../util/logger.util";

export class EmailService {

    public static async sendEmail(to:string, subject:string, mess:string): Promise<boolean> {
        try{
            if(!to || !subject || !mess){
                logger.error("Email Service: Missing required fields" );
                return false;
            }else{
                let response = await transporter.sendMail({
                    to: to,
                    subject: subject,
                    html: `<h1>NoGas notification</h1> <h2>This is an automated message. Please do not reply.</h2> <p>${mess}</p>`
                });
                logger.info("Email Service : email sent");
                return !!response.envelope;
            }
        }catch(err){
            logger.error("Email Service: "+ err );
            return false;
        }
    }
    public static async sendEmailToContact(userID:number): Promise<boolean> {
        try{
            if(userID == undefined){
                logger.error("Email Service: Missing required fields");
                return false;
            }else{
                let user = await UserService.findUserByID(userID);
                let getContacts = await ContactService.getContacts(userID);
                let mailList:string[] = [];
                if(getContacts == null || !getContacts.length || !user) {
                    console.log("Here")
                    return false;
                }
                getContacts.map(contact => {
                    mailList.push(contact.email);
                })
                mailList.push(user.email);

                let response = await transporter.sendMail({
                    to: mailList,
                    subject: 'NoGas security email',
                    html: `<h1>NoGas notification</h1> <h2>This is an automated message. Please do not reply.</h2> <p> ${user.first_name} ${user.last_name} is in danger and there's possibility of death </p>`
                })
                logger.info("Email Service : email sent")
                return !!response.envelope;
            }
        }catch(err){
            logger.error("Email Service: "+ err );
            return false;
        }
    }
}