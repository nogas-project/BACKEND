import {UserService} from "../service/user.service";
import { Request, Response } from 'express';

export class UserController {
    public async register(req: Request, res: Response){
        try {
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let email = req.body.email;
            let password = req.body.password;
            let phone = req.body.phone;
            const result = await UserService.register(first_name, last_name, email, password, phone, false);
            if (result.flag) {
                res.status(201).json(result.id);
            }else{
                res.status(400).json(result.mess);
            }
        }catch (e) {
            res.status(500).json("Error from our side");
        }
    }
    public async login(req: Request, res: Response){
        try {
            let email = req.body.email;
            let password = req.body.password;
            const result = await UserService.login(email, password);
            if (!result.flag) {
                res.status(400).send(result.mess);
            }else{
                res.status(200).send(result.mess);
            }
        }catch (e){
            res.status(500).send(false);
        }
    }
    public async modifyUser(req: Request, res: Response){
        try {
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let email = req.body.email;
            let password = req.body.password;
            let phone = req.body.phone;
            let id = req.params.id;
            const result = await UserService.modifyUser(first_name, last_name, email, password,phone,Number(id));
            if(result.flag)res.status(200).json(result);
            else res.status(404).json(result);

        }catch (e){
            res.status(500).send(false);
        }
    }
    public async findById(req: Request, res: Response){
        try {
            let id = req.params.id;
            const result = await UserService.findUserByID(Number(id));
            if(result)res.status(200).json(result);
            else res.status(404).send(result);
        }catch (e:any){
            res.status(500).send(false);
        }
    }

}