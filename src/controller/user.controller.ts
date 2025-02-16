import {UserService} from "../service/user.service";
import { Request, Response } from 'express';

export class UserController {

    public async modifyUser(req: Request, res: Response) {
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

    public async findById(req: Request, res: Response) {
        try {
            let id = req.params.id;
            const result = await UserService.findUserByID(Number(id));
            if(result)res.status(200).json(result);
            else res.status(404).send(result);
        }catch (e:any){
            res.status(500).send(false);
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            let id = req.params.id;
            const result = await UserService.deleteUser(id);
            if(result)res.status(200).json(result);
            else res.status(404).send(result);
        } catch (error) {
            res.status(500).send(false);
        }

    }

}