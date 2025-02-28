import {ContactService as cs} from "../service/contact.service";
import {Response, Request} from "express";
import { loggerController as logger} from "../util/logger.util";

export class contactController {
    public static async getContacts(req: Request, res: Response) {
        try {
            const result = await cs.getContacts(Number(req.params.id));
            if (result == null || result.length == 0) {
                logger.http("- 404 - Contact Controller");
                logger.error("Contact Service: No contact found");
                res.status(404).json('No contacts found');
            }else{
                logger.http("- 200 - Contact Controller");
                logger.info("Contacts Controller: Contact retrieved");
                res.status(200).json(result);
            }
        }catch (e){
            logger.http("- 500 - Contact Controller");
            logger.error("Contact Controller: " + e);
            res.status(500).json("Something went wrong");
        }
    }
    public static async addContact(req: Request, res: Response) {
        try{
            let { name, email } = req.body;
            if(!name || !email) res.status(400).json("Missing required fields");
            const result = await cs.addContact(name, email, Number(req.params.id));
            if(result.flag){
                logger.http("- 200 - Contact Controller");
                logger.info("Contacts Controller: Contact added");
                res.status(200).json(result.mess);
            }
            else {
                logger.http("- 404 - Contact Controller");
                logger.error("Contact Service: " + result.mess);
                res.status(404).json(result.mess);
            }
        }catch (e){
            logger.http("- 500 - Contact Controller");
            logger.error("Contact Controller: " + e);
            res.status(500).json("Something went wrong");
        }
    }
    public static async modifyContact(req: Request, res: Response) {
        try{
            let { name, email, id } = req.body;
            const result = await cs.modifyContact(name,email,Number(req.params.id),id);
            if(result.flag){
                logger.http("- 200 - Contact Controller");
                logger.info("Contacts Controller: Contact modified");
                res.status(200).send(result.mess);
            }
            else {
                logger.http("- 404 - Contact Controller");
                logger.error("Contact Service: " + result.mess);
                res.status(404).json(result.mess);
            }
        }catch (e){
            logger.http("- 500 - Contact Controller");
            logger.error("Contact Controller: " + e);
            res.status(500).json("Something went wrong");
        }
    }
    public static async deleteContact(req: Request, res: Response) {
        try{
            const result = await cs.deleteContact(req.body.id);
            if(result) {
                logger.http("- 200 - Contact Controller");
                logger.info("Contacts Controller: Contact deleted");
            }res.status(200).json("Contact deleted");
        }catch (e){
            logger.http("- 500 - Contact Controller");
            logger.error("Contact Controller: " + e);
            res.status(500).json("Something went wrong");
        }
    }
}