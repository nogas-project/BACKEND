import {UserService} from "../service/user.service";
import { Request, Response } from 'express';

export class UserController {


    public async register(req: Request, res: Response){
        try {
            const phoneRegex : RegExp = /^\d{3}-\d{3}-\d{4}$/;
            const emailRegex : RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let flag;
            let {first_name, last_name, email, password, phone} = req.body;

            if(!first_name || !last_name || !email || !password || !phone) {
                res.status(400).json("Missing required fields")
            }
            else if(!emailRegex.test(email)) {
                res.status(400).json("Email is invalid");
            }
            else if(!phoneRegex.test(phone)) {
                res.status(400).json("Phone number is invalid");
            }
            else{
                const result = await UserService.register(first_name, last_name, email, password, phone, false);
                if (result.flag) {
                    res.status(201).json(result);
                }else{
                    res.status(400).json(result.mess);
                }
            }
        }catch (e) {
            console.log(e);
        }
    }
    public async login(req: Request, res: Response){
        try {
            let email = req.body.email;
            let password = req.body.password;
            if(!email || !password) res.status(400).json("Missing required fields");
            else{
                const result = await UserService.login(email, password);
                if (!result.flag) {
                    res.status(400).json(result.mess);
                }else{
                    res.status(200).json(result.mess);
                }
            }

        }catch (e){
            res.status(500).send(false);
        }
    }
    public async modifyUser(req: Request, res: Response){
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