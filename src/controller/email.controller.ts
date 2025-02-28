import {Response, Request} from "express";
import {EmailService} from "../service/email.service";
import { loggerController as logger } from "../util/logger.util";

export class emailController {
    public static async sendEmail(req : Request, res: Response) {
        try {
            let {to, subject, mess} = req.body;
            if(!to){
                logger.http("- 400 - Email Controller");
                logger.error("Contact Controller: Missing parameters");
                res.status(400).json({"mess":"Missing parameters"});
            }else{
                const response = await EmailService.sendEmail(to, subject, mess);
                if(response) {
                    logger.http("- 200 - Contact Controller");
                    logger.info("Email Controller: Email sent ");
                    res.status(200).json({"mess":"Email sent successfully"});
                }
                else {
                    logger.http("- 404 - Email Controller");
                    logger.error("Email Controller: Email not sent" );
                    res.status(404).json({"mess":"Email not sent"});
                }
            }

        }catch(err){
            logger.http("- 500 - Email Controller");
            logger.error("Email Controller: " + err);
            res.status(500).json({"mess": "Something went wrong"});
        }
    }
    public static async sendEmailToContact(req : Request, res: Response) {
        try {
            let id = req.params.id;
            if(!id){
                logger.http("- 400 - Email Controller");
                logger.error("Contact Controller: Missing parameters");
                res.status(400).json({"mess":"Missing parameters"});
            }else{
                const response = await EmailService.sendEmailToContact(Number(id));
                if(response) {
                    logger.http("- 200 - Email Controller");
                    logger.info("Email Controller: Email sent");
                    res.status(200).json({"mess":"Email sent successfully"});
                }
                else {
                    logger.http("- 400 - Email Controller")
                    logger.error("Email Controller: Email not sent");
                    res.status(404).json({"mess":"Email not sent"});
                }
            }
        }catch(err){
            logger.http("- 500 - Email Controller");
            logger.error("Email Controller: " + err);
            res.status(500).json({"mess": "Something went wrong"});
        }
    }
}