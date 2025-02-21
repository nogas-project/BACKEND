import {Response, Request} from "express";
import {EmailService} from "../service/email.service";
export class emailController {
    public static async sendEmail(req : Request, res: Response) {
        try {
            let {to, subject, mess} = req.body;
            if(!to){
                res.status(400).json({"mess":"Missing parameters"});
            }else{
                const response = await EmailService.sendEmail(to, subject, mess);
                if(response) res.status(200).json({"mess":"Email sent successfully"});
                else res.status(404).json({"mess":"Email not sent"});
            }

        }catch(err){
            res.status(400).json({"mess": "Something went wrong"});
        }
    }
    public static async sendEmailToContact(req : Request, res: Response) {
        try {
            let {subject, mess} = req.body;
            if(!subject || !mess){
                res.status(400).json({"mess":"Missing parameters"});
            }else{
                const response = await EmailService.sendEmailToContact(subject,mess,Number(req.params.id));
                if(response) res.status(200).json({"mess":"Email sent successfully"});
                else res.status(404).json({"mess":"Email not sent"});
            }
        }catch(err){
            res.status(400).json({"mess": "Something went wrong"});
        }
    }
}