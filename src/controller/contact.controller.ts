import {ContactService as cs} from "../service/contact.service";
import {Response, Request} from "express";

export class contactController {
    public static async getContacts(req: Request, res: Response) {
        try {
            const result = await cs.getContacts(Number(req.params.id));
            if (result == null || result.length == 0) {
                res.status(404).send('No contacts found');
            }else{
                res.status(200).json(result);
            }
        }catch (e){
            res.status(500).send("Something went wrong");
        }
    }
    public static async addContact(req: Request, res: Response) {
        try{
            let { name, phone } = req.body;
            const result = await cs.addContact(name, phone, Number(req.params.id));
            if(result.flag)res.status(200).send(result.mess);
            else res.status(404).send(result.mess);
        }catch (e){
            res.status(500).send("Something went wrong");
        }
    }
    public static async modifyContact(req: Request, res: Response) {
        try{
            let { name, phone, id } = req.body;
            const result = await cs.modifyContact(name,phone,Number(req.params.id),id);
            if(result.flag)res.status(200).send(result.mess);
            else res.status(404).send(result.mess);
        }catch (e){
            res.status(500).send("Something went wrong");
        }
    }
    public static async deleteContact(req: Request, res: Response) {
        try{
            const result = await cs.deleteContact(req.body.id);
            if(result) res.status(200).send("Contact deleted");
        }catch (e){
            res.status(500).send("Something went wrong");
        }
    }
}