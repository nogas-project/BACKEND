import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { verify } from "jsonwebtoken";
import { config } from "../config/config"

export class AuthController {

    public async validateToken(req: Request, res: Response) : Promise<any> {
        try {
            const token = req.body.token;
            if (!token) {
                return res.status(400).json('Authentication credentials missing');
            }

            const user = verify(token, config.JWT_SECRET);
            if (!user) {
                return res.status(401).json('Invalid token');
            }

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json('Internal server error');
        }
    }

    public async register(req: Request, res: Response): Promise<any> {
        try {
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let email = req.body.email;
            let password = req.body.password;
            let phone = req.body.phone;
            if (!first_name || !last_name || !email || !password || !phone) {
                return res.status(400).json('Missing required fields');
            }
            const result = await AuthService.register(first_name, last_name, email, password, phone, false);
            if (result.flag) {
                res.status(201).json(result.mess);
            }else{
                res.status(401).json(result.mess);
            }
        }catch (e) {
            res.status(500).json("Error from our side");
        }
    }

    public async login(req: Request, res: Response): Promise<any> {
        try {
            let email = req.body.email;
            let password = req.body.password;
            if (!email || !password) {
                return res.status(400).json('Missing required fields');
            }
            const result = await AuthService.login(email, password);
            if (!result.flag) {
                res.status(401).json(result.mess);
            }else{
                res.status(200).json(result.mess);
            }
        }catch (e){
            res.status(500).send(false);
        }
    }
}