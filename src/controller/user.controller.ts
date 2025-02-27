import {UserService} from "../service/user.service";
import { Request, Response } from 'express';

export class UserController {

    public async modifyUser(req: Request, res: Response) {
        try {
            let {first_name, last_name, email, password, phone} = req.body;
            let id = req.params.id;
            if(!first_name || !last_name || !email || !password || !phone) {
                res.status(400).json("Missing required fields");
            }
            else{
                const result = await UserService.modifyUser(first_name, last_name, email, password,phone,Number(id));
                if(result.flag)res.status(200).json(result);
                else res.status(404).json(result);
            }


        }catch (e){
            res.status(500).send(false);
        }
    }

    public async findById(req: Request, res: Response) {
        try {
            let id = req.params.id;
            if (!id) {
                res.status(400).json("Missing required fields");
            }
            const result = await UserService.findUserByID(Number(id));
            if(result)res.status(200).json(result);
            else res.status(404).json(result);
        }catch (e:any){
            res.status(500).send(false);
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            let id = req.params.id;
            if (!id) {
                res.status(400).json("Missing required fields");
            }
            const result = await UserService.deleteUser(id);
            if(result)res.status(200).json(result);
            else res.status(404).json(result);
        } catch (error) {
            res.status(500).send(false);
        }

    }

}